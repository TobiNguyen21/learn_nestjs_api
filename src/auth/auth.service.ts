import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDTO } from "./dto";
import * as argon from 'argon2';

@Injectable({}) // this is "Dependency Injection"
export class AuthService {
    constructor(private prismaService: PrismaService) {

    }
    async register(authDTO: AuthDTO) {
        // generate password to hashedPassword
        const hashedPassword = await argon.hash(authDTO.password);
        // insert data to dbs
        try {
            const data = await this.prismaService.user.create({
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
            return {
                message: "Register an user",
                metadata: data
            }
        } catch (error) {
            return {
                error: error
            }
        }
    }
    login() {
        return {
            message: "This is login"
        }
    }
}