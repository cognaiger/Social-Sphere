import { Injectable } from "@nestjs/common";
import { SignupDto } from "./dto/signup.dto";
import { User } from "src/entities/user.entity";
import { AppDataSource } from "../database/datasource";

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

    login() {

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