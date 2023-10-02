import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { MyJwtGuard } from "../auth/guard";
import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
    @UseGuards(MyJwtGuard)
    @Get('me')
    me(@GetUser() user: User) {
        // console.log(request.user);
        return user;
    }
}
