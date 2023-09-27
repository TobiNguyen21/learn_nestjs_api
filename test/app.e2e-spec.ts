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

describe('App EndToEnd tests', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    prismaService = app.get(PrismaService)
    await prismaService.cleanDatabase();
  })
  afterAll(async () => {
    app.close()
  })
  it.todo('should PASS vv');
  it.todo('should PASS vvw');
})