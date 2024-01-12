import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ReactionController } from '../../src/reaction/reaction.controller';
import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  AuthRequest,
  AuthorizationGuard,
  ReactionType,
} from '@friends-club/common';
import { ReactionDto } from '../../src/reaction/dto/reaction.dto';
import { ReactionPerPostRequest } from 'apps/interaction/src/reaction/dto/reaction-per-post-request.dto';
import { CreateReactionRequest } from 'apps/interaction/src/reaction/dto/create-reaction-request.dto';

jest.mock('@nestjs/cqrs');

describe('InteractionController', () => {
  let reactionController: ReactionController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;
  const mockAuthReq = {
    auth: {
      iss: 'mock-issuer',
      sub: 'mock-subject',
      aud: ['mock-audience'],
      iat: Date.now(),
      exp: Date.now() + 3600 * 1000,
      azp: 'mock-authorized-party',
      scope: 'mock-scope',
    },
    // Mocking other necessary properties/methods from the Request interface
    cache: {},
    credentials: {},
    destination: 'mock-destination',
    headers: {}, // Mock headers as needed
    get: jest.fn(),
    accepts: jest.fn(),
    acceptsCharsets: jest.fn(),
    // ... add other necessary methods and properties from Request
  } as unknown as AuthRequest;

  beforeEach(async () => {
    const mock_Guard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReactionController],
      providers: [CommandBus, QueryBus],
    })
      .overrideGuard(AuthorizationGuard)
      .useValue(mock_Guard)
      .compile();

    reactionController = module.get<ReactionController>(ReactionController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  const reactionDto: ReactionDto[] = [
    {
      _id: '1',
      userId: 'user123',
      postId: 101,
      reactionType: ReactionType.like,
    },
    {
      _id: '2',
      userId: 'user124',
      postId: 102,
      reactionType: ReactionType.dislike,
    },
    {
      _id: '3',
      userId: 'user125',
      postId: 103,
      reactionType: ReactionType.like,
    },
    {
      _id: '4',
      userId: 'user126',
      postId: 104,
      reactionType: ReactionType.dislike,
    },
    {
      _id: '5',
      userId: 'user127',
      postId: 105,
      reactionType: ReactionType.like,
    },
  ];

  describe('/api/reaction?userId=', () => {
    it('should return reactions for a given post id', async () => {
      jest
        .spyOn(queryBus, 'execute')
        .mockImplementation(() => Promise.resolve(reactionDto[0]));
      const request: ReactionPerPostRequest = {
        postId: reactionDto[0].postId,
      };
      const result = await reactionController.getReaction(request);

      expect(result).toEqual(reactionDto[0]);
    });
  });

  describe('/api/reaction', () => {
    it('should create a reaction', async () => {
      // Mocking the AuthRequest behavior here is omitted for simplicity
      jest
        .spyOn(commandBus, 'execute')
        .mockImplementation(() => Promise.resolve(reactionDto[0]));

      const mockCreateRequest: CreateReactionRequest = {
        userId: 'user123',
        postId: 101,
        reactionType: ReactionType.like,
      };

      await reactionController.createReaction(mockAuthReq, mockCreateRequest);

      expect(commandBus.execute).toHaveBeenCalledWith(expect.anything());
    });
  });
});
