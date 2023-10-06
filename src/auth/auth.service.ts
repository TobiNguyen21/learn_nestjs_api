import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDTO } from "./dto";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({}) // this is "Dependency Injection"
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }
    async register(authDTO: AuthDTO) {
        // generate password to hashedPassword
        const hashedPassword = await argon.hash(authDTO.password);
        // insert data to dbs
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: authDTO.email,
                    hashedPassword: hashedPassword,
                    firtName: '',
                    lastName: ''
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true
                }
            })
            return await this.signJwtToken(user.id, user.email);
        } catch (error) {
            if (error.code == 'P2002') {
                throw new ForbiddenException('User with this email already exists');
            }
        }
    }
    async login(authDTO: AuthDTO) {
        // find user with input email
        const user = await this.prismaService.user.findUnique({
            where: {
                email: authDTO.email
            }
        });
        if (!user) {
            throw new ForbiddenException('User not found');
        }
        const passwordMatched = await argon.verify(user.hashedPassword, authDTO.password);
        if (!passwordMatched) {
            throw new ForbiddenException('Incorrect password');
        }
        delete user.hashedPassword;

        return await this.signJwtToken(user.id, user.email);
    }
    async signJwtToken(userId: number, email: string): Promise<{ accessToken: string }> {
        const payload = {
            sub: userId,
            email
        }
        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get('EXPIRE_TOKEN'),
            secret: this.configService.get('JWT_SECRET')
        })
        return {
            accessToken: jwtString
        }
    }
}