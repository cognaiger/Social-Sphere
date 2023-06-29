import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignupDto } from "./dto/signup.dto";
import { User } from "src/entities/user.entity";

import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "../database/repositories/user.repository";

@Injectable()
export class AuthService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const { username, password } = loginDto;


        const user = await this.userRepository.findOneBy({
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
            id: user.id,
            name: user.name,
            profilePic: user.profilePic
        };
    }

    async signup(signupDto: SignupDto) {
        const { username, email, password, name } = signupDto;


        const existingUser = await this.userRepository.findOneBy({
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
        await this.userRepository.save(user);

        return true;
    }
}