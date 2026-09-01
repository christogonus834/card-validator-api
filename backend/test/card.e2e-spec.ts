import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Card validation (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST /card/validate returns valid: true for a correct card number', () => {
    return request(app.getHttpServer())
      .post('/card/validate')
      .send({ cardNumber: '4111111111111111' })
      .expect(200)
      .expect((res) => {
        expect(res.body.valid).toBe(true);
      });
  });

  it('POST /card/validate returns valid: false for a bad Luhn checksum', () => {
    return request(app.getHttpServer())
      .post('/card/validate')
      .send({ cardNumber: '1234567890123456' })
      .expect(200)
      .expect((res) => {
        expect(res.body.valid).toBe(false);
      });
  });

  it('POST /card/validate returns 400 when cardNumber is missing', () => {
    return request(app.getHttpServer()).post('/card/validate').send({}).expect(400);
  });

  it('POST /card/validate returns 400 for unexpected extra fields', () => {
    return request(app.getHttpServer())
      .post('/card/validate')
      .send({ cardNumber: '4111111111111111', extra: 'nope' })
      .expect(400);
  });
});
