import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { promises } from "dns";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {

    };

    @Post('login')
    async login() {
        return this.authService.login();
    }

    @Post('signup')
    async signup(@Body() signupDto: SignupDto): Promise<boolean> {
        return this.authService.signup(signupDto);
    }
}