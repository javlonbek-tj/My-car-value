import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication system', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 10000);

  it('handles a signup request', async () => {
    const randomEmail = 'asdsdsdf@gmail.com';
     const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: randomEmail, password: 'asdfgs' })
      .expect(201);

      const { email, id } = res.body;
      expect(id).toBeDefined();
      expect(email).toEqual(randomEmail);
  });

  it('signup a new user then get the currently logged in user', async () => {
    const randomEmail = 'adasd@gmail.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: randomEmail, password: 'asdfgs' })
      .expect(201);

    const cookie = res.get('Set-Cookie');
    const { body } = await request(app.getHttpServer())
      .get('/auth/whoAmI')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(randomEmail);
  });
});
