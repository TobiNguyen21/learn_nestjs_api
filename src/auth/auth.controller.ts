import { Controller, Post, Req, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto"; //import a 'folder"
@Controller('auth')
export class AuthController {
    // Khi AuthController được tạo ra thì AuthService cũng được tạo ra
    constructor(
        private authService: AuthService
    ) { }

    // các request từ client
    @Post("register") // register a new user
    register(@Body() body: AuthDTO) {
        return this.authService.register(body);
    }

    @Post("login")
    login(@Body() body: AuthDTO) {
        return this.authService.login(body);
    }
}