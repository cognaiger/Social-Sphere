import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./users.service";

@Controller("user")
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @Get(":id")
    async getUserById(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }
} 