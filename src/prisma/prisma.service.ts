import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(configService: ConfigService) {
        super({
            datasources: {
                db: {
                    url: configService.get('DATABASE_URL')  // giống process.env bên nodejs
                }
            }
        })
        // console.log('configService', JSON.stringify(configService), process.env.DATABASE_URL);
    }
}
