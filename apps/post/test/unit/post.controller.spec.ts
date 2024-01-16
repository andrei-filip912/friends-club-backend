import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from '../../src/application/post.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostRequest } from '../../src/application/dto/create-post-request.dto';
import { PostDto } from '../../src/application/dto/post.dto';
import { UpdatePostCaptionRequest } from '../../src/application/dto/update-post-caption-request.dto';
import { DeletePostRequest } from '../../src/application/dto/delete-post-request.dto';
import * as fs from 'fs';
import { Readable } from 'stream';
import { AuthRequest, AuthorizationGuard } from '@friends-club/common';
import { CanActivate } from '@nestjs/common';
import * as mocks from 'node-mocks-http';

jest.mock('@nestjs/cqrs');

describe('PostController', () => {
  let postController: PostController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  /*
    Mock data
  */
  const postDtos: PostDto[] = [
    {
      id: 1,
      caption: 'Beautiful sunset at the beach',
      image_id: 'abc123xyz789456',
    },
    {
      id: 2,
      caption: 'Exploring the mountains',
      image_id: 'def456uvw123xyz',
    },
    {
      id: 3,
      caption: 'City lights at night',
      image_id: 'ghi789abc456xyz',
    },
    {
      id: 4,
      caption: 'Cute puppy in the park',
      image_id: 'jkl012mno345pqr',
    },
    {
      id: 5,
      caption: 'Delicious food from the local market',
      image_id: 'mno345pqr789abc',
    },
  ];

  const userId = 'auth0|d23d2ef0effdv0kw';
  const req = mocks.createRequest();
  req.auth = {
    iss: 'issuer',
    sub: userId,
    aud: ['audience1', 'audience2'],
    iat: 1634630400, // replace with the desired timestamp
    exp: 1634716800, // replace with the desired timestamp
    azp: 'authorizedParty',
    scope: 'read write',
  };

  beforeEach(async () => {
    const mock_Guard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [CommandBus, QueryBus],
    })
      .overrideGuard(AuthorizationGuard)
      .useValue(mock_Guard)
      .compile();

    postController = module.get<PostController>(PostController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('getPosts', () => {
    it('should return an array of posts', async () => {
      const expectedResult: PostDto[] = postDtos;

      jest
        .spyOn(queryBus, 'execute')
        .mockImplementation(() => Promise.resolve(expectedResult));

      expect(await postController.getPosts()).toBe(expectedResult);
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      // Mocking the readFileSync function of fs
      jest
        .spyOn(fs, 'readFileSync')
        .mockReturnValue(Buffer.from('mocked-image-content'));

      // Creating a mock image file
      const image: Express.Multer.File = {
        fieldname: 'image',
        originalname: 'image.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('mocked-image-content'),
        size: 100, // Adjust the size accordingly
        stream: Readable.from(['mocked-image-content']),
        destination: '/path/to/destination',
        filename: 'image.jpg',
        path: '/path/to/destination/image.jpg',
      };

      const createPostRequest: CreatePostRequest = {
        caption: 'Beautiful sunset at the beach',
        image: image,
        userId: userId,
      };
      const expectedResult = postDtos[0];

      jest
        .spyOn(commandBus, 'execute')
        .mockImplementation(() => Promise.resolve(expectedResult));

      expect(
        await postController.createPost(
          image,
          createPostRequest,
          req as unknown as AuthRequest,
        ),
      ).toBe(expectedResult);
    });
  });

  describe('updatePostCaption', () => {
    it('should update the caption of a post', async () => {
      const postId = 1;
      const updatePostCaptionRequest: UpdatePostCaptionRequest = {
        postId: postDtos[0].id,
        caption: postDtos[0].caption,
        userId: userId,
      };
      const expectedResult: PostDto = postDtos[0];

      jest
        .spyOn(commandBus, 'execute')
        .mockImplementation(() => Promise.resolve(expectedResult));

      expect(
        await postController.updatedPostCaption(
          postId,
          updatePostCaptionRequest,
          req as unknown as AuthRequest,
        ),
      ).toBe(expectedResult);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const postId = 1;
      const deletePostRequest: DeletePostRequest = {
        postId: postDtos[0].id,
        userId: userId,
      };

      jest
        .spyOn(commandBus, 'execute')
        .mockImplementation(() => Promise.resolve());

      expect(
        await postController.deletePost(
          postId,
          deletePostRequest,
          req as unknown as AuthRequest,
        ),
      ).toBeUndefined();
    });
  });
});
