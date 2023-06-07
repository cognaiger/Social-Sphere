import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(30)
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(100)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    name: string;
}