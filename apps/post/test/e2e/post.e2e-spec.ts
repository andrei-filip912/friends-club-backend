import { AuthorizationGuard, SqlDatabaseModule } from '@friends-club/common';
import {
  CanActivate,
  ExecutionContext,
  INestApplication,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostRequest } from 'apps/post/src/application/dto/create-post-request.dto';
import { DeletePostRequest } from 'apps/post/src/application/dto/delete-post-request.dto';
import { UpdatePostCaptionRequest } from 'apps/post/src/application/dto/update-post-caption-request.dto';
import { Readable } from 'stream';
import * as request from 'supertest';
import { PostRepository } from '../../src/infrastructure/post.db-entity.repository';
import { PostModule } from '../../src/infrastructure/post.module';
import { SqlMockModule } from '../utils/TypeORMSQLITETestingModule';

// mock values
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
const mockToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const userId = 'auth0|d23d2ef0effdv0kw';

describe('PostService (Integration)', () => {
  let app: INestApplication;
  let postRepository: PostRepository;

  beforeEach(async () => {
    const mock_Guard: CanActivate = {
      canActivate: (context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();

        req.auth = {
          iss: 'issuer',
          sub: userId,
          aud: ['audience1', 'audience2'],
          iat: 1634630400,
          exp: 1634716800,
          azp: 'authorizedParty',
          scope: 'read write',
        };

        return true;
      },
    };

    // {
    //   canActivate: jest.fn(() => true),
    // };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostModule],
    })
      .overrideModule(SqlDatabaseModule)
      .useModule(SqlMockModule)
      .overrideGuard(AuthorizationGuard)
      .useValue(mock_Guard)
      .compile();

    postRepository = moduleFixture.get<PostRepository>(PostRepository);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/api/post (POST)', () => {
    it('should create a new post that only contains text', async () => {
      // arrange
      const createPostRequest = {
        caption: 'Beautiful sunset at the beach',
        image: undefined,
      };

      // act
      const response = await request(app.getHttpServer())
        .post('/post')
        .send(createPostRequest)
        .expect(201);

      const createdPost = response.body;
      const databasePost = await postRepository.findOneById(createdPost.id);

      // assert
      expect(databasePost.caption).toEqual(createPostRequest.caption);
      expect(databasePost.image_id).toEqual('');
      expect(typeof databasePost.id).toBe('number');
    });

    it('should create a new post that only contains an image and text', async () => {
      // arrange
      const createPostRequest: CreatePostRequest = {
        caption: 'Beautiful sunset at the beach',
        image: image,
        userId: userId,
      };

      // act
      const response = await request(app.getHttpServer())
        .post('/post')
        .send(createPostRequest)
        .expect(201);

      const createdPost = response.body;
      const databasePost = await postRepository.findOneById(createdPost.id);

      // assert
      expect(databasePost.caption).toEqual(createPostRequest.caption);
      expect(databasePost.image_id).toEqual('');
      expect(typeof databasePost.id).toBe('number');
    });
  });

  describe('/api/post/:id/caption (PATCH)', () => {
    it('should update the caption from a post', async () => {
      // arrange
      // create post to update
      const createPostRequest = {
        caption: 'Beautiful sunset at the beach',
        image: undefined,
      };
      const response = await request(app.getHttpServer())
        .post('/post')
        .send(createPostRequest)
        .expect(201);
      const initialPost = await postRepository.findOneById(response.body.id);

      const updateRequest: UpdatePostCaptionRequest = {
        postId: initialPost.id,
        caption: 'Beautiful sunset at the beach in Turkey :) !!!',
        userId: userId,
      };

      // act
      await request(app.getHttpServer())
        .patch(`/post/${initialPost.id}/caption`)
        .send(updateRequest)
        .expect(200);

      const updatedPost = await postRepository.findOneById(initialPost.id);
      // assert
      expect(updatedPost.id).toEqual(initialPost.id);
      expect(updatedPost.caption).toEqual(updateRequest.caption);
      expect(updatedPost.image_id).toEqual('');
    });
  });

  describe('/api/post/:id/ (DELETE)', () => {
    it('should delete a post', async () => {
      // arrange
      // create post to delete
      const createPostRequest = {
        caption: 'Beautiful sunset at the beach',
        image: image,
      };
      const response = await request(app.getHttpServer())
        .post('/post')
        .send(createPostRequest)
        .expect(201);
      const initialPost = await postRepository.findOneById(response.body.id);
      const deleteRequest: DeletePostRequest = {
        postId: initialPost.id,
        userId: userId,
      };

      // act
      await request(app.getHttpServer())
        .delete(`/post/${initialPost.id}`)
        .send(deleteRequest)
        .expect(200);
      // assert
      expect(async () => {
        await postRepository.findOneById(initialPost.id);
      }).rejects.toThrow();
    });
  });
});

describe('authorization tests', () => {
  let app: INestApplication;
  let postRepository: PostRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostModule],
    })
      .overrideModule(SqlDatabaseModule)
      .useModule(SqlMockModule)
      .compile();

    postRepository = moduleFixture.get<PostRepository>(PostRepository);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should return 401 for creating a post without token', async () => {
    // arrange
    const createPostRequest = {
      caption: 'Beautiful sunset at the beach',
      image: undefined,
    };

    // act & assert
    await request(app.getHttpServer())
      .post('/post')
      .send(createPostRequest)
      .expect(401);
  });

  it('should return 401 for creating a post with a bad token', async () => {
    // arrange
    const createPostRequest = {
      caption: 'Beautiful sunset at the beach',
      image: undefined,
    };

    // act & assert
    await request(app.getHttpServer())
      .post('/post')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(createPostRequest)
      .expect(401);
  });
});
