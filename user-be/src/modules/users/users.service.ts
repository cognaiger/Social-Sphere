import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../database/repositories/user.repository";

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) {
    }

    async getUserById(id: number) {
        const user = await this.userRepo.findOne({
            select: {
                id: true,
                name: true,
                profilePic: true
            },
            where: {
                id: id
            }
        })

        if (!user) {
            throw new NotFoundException("User not found", { cause: new Error() });
        }

        return user;
    }
}