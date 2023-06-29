import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    userId: number
}