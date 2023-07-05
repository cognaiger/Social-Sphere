import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
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

    async login(username, password): Promise<any> {
        const user = await this.userRepository.findOneBy({
            username: username
        })

        if (!user) {
            throw new NotFoundException("User not found", { cause: new Error() });
        }

        const isMatch = await bcrypt.compare(password, user.pass);
        if (!isMatch) {
            throw new NotAcceptableException("Password is wrong", { cause: new Error() });
        }

        const payload = { id: user.id, name: user.name, profilePic: user.profilePic };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signup(signupDto: SignupDto) {
        const { username, email, password, name } = signupDto;


        const existingUser = await this.userRepository.findOneBy({
            username: username,
        });

        if (existingUser) {
            throw new ConflictException("Username already exists!", { cause: new Error() });
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