import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignupDto } from "./dto/signup.dto";
import { User } from "src/entities/user.entity";
import { AppDataSource } from "../database/datasource";

import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const { username, password } = loginDto;

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({
            username: username
        })

        if (!user) {
            throw new Error("No such user exist");
        }

        const isMatch = bcrypt.compare(password, user.pass);
        if (!isMatch) {
            throw new UnauthorizedException;
        }

        const payload = { sub: user.id, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signup(signupDto: SignupDto) {
        const { username, email, password, name } = signupDto;

        const userRepository = AppDataSource.getRepository(User);

        const existingUser = await userRepository.findOneBy({
            username: username,
        });

        if (existingUser) {
            throw new Error("Username already exists!");
        }

        // hash password
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        const user = new User();
        user.email = email;
        user.name = name;
        user.pass = hash;
        user.username = username;
        await userRepository.save(user);

        return true;
    }
}