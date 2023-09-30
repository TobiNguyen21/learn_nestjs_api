// make a database for testing !
// Everytime we run tests, clean up data
// We must call request like we do with Postman
/**
 * How to open prisma studio on test_database?
 * npx dotenv -e .env.test -- prisma studio
 * How to open prisma studio on dev_database?
 * npx dotenv -e .env -- prisma studio
 */
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';

const PORT = 3002;

describe('App EndToEnd tests', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    prismaService = app.get(PrismaService)
    app.listen(PORT);
    await prismaService.cleanDatabase();
    pactum.request.setBaseUrl(`http://localhost:${PORT}`);
  })

  // TEST AUTHENTICATION
  describe('Test authentication', () => {

    // TEST REGISTER
    describe('Register', () => {
      it('should Register', () => {
        return pactum.spec()
          .post('/auth/register')
          .withBody({
            email: 'test@gmail.com',
            password: '123456789'
          })
          .expectStatus(201)
        // .inspect()
      })
      it('should Register with empty email', () => {
        return pactum.spec()
          .post('/auth/register')
          .withBody({
            email: '',
            password: '123456789'
          })
          .expectStatus(400)
        // .inspect()
      })
      it('should Register with invalid email format', () => {
        return pactum.spec()
          .post('/auth/register')
          .withBody({
            email: 'nat21102002@gmail',
            password: '123456789'
          })
          .expectStatus(400)
        // .inspect()
      })
      it('should Register with empty password', () => {
        return pactum.spec()
          .post('/auth/register')
          .withBody({
            email: 'nat21102002@gmail',
            password: ''
          })
          .expectStatus(400)
        // .inspect()
      })
      it('should Register with length_password < 8', () => {
        return pactum.spec()
          .post('/auth/register')
          .withBody({
            email: 'nat21102002@gmail',
            password: '1234567'
          })
          .expectStatus(400)
        // .inspect()
      })
    })

    // TEST LOGIN
    describe('Login', () => {
      it('should Login', () => {
        return pactum.spec()
          .post('/auth/login')
          .withBody({
            email: 'test@gmail.com',
            password: '123456789'
          })
          .expectStatus(201)
          .stores('accessToken', 'accessToken')
        // .inspect()
      })
      it('should Login with invalid email', () => {
        return pactum.spec()
          .post('/auth/login')
          .withBody({
            email: 'test@gmail',
            password: '123456789'
          })
          .expectStatus(400)
        // .inspect()
      })
      it('should Login with invalid password', () => {
        return pactum.spec()
          .post('/auth/login')
          .withBody({
            email: 'test@gmail.com',
            password: ''
          })
          .expectStatus(400)
        // .inspect()
      })
    })

    // TEST GET DETAIL USER
    describe('User', () => {
      describe('Get detail user', () => {
        it('should get detail user', () => {
          return pactum.spec()
            .get('/user/me')
            .withBearerToken('$S{accessToken}')
            .expectStatus(200)
            .inspect()
        })
      })
    })

    // TEST NOTE
    describe('Note', () => {
      describe('Insert Note', () => {
      })
      describe('Get all Note', () => {
      })
      describe('Get one Note by ID', () => {
      })
      describe('Delete Note', () => {
      })
    })
  })

  afterAll(async () => {
    app.close()
  })
  it.todo('should PASS vv');
})
