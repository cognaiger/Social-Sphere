import { Controller, Post, Body, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {

    };

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<any> {
        return this.authService.login(loginDto);
    }

    @Post('signup')
    async signup(@Body() signupDto: SignupDto): Promise<boolean> {
        return this.authService.signup(signupDto);
    }
}