import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"
// Define a "type" of "authentication request"
export class AuthDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @Length(8)
    @IsNotEmpty()
    password: string
}