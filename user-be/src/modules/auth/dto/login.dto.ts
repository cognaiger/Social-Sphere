import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    username: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    password: string
}