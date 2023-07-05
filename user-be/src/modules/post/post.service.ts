import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PostRepository } from "../database/repositories/post.repository";
import { CreatePostDto } from "./dto/createPost.dto";
import { Post } from "src/entities/post.entity";
import { UserRepository } from "../database/repositories/user.repository";
import { User } from "src/entities/user.entity";
import { createQueryBuilder } from "typeorm";

@Injectable()
export class PostService {
    constructor(private readonly postRepo: PostRepository,
                private readonly userRepo: UserRepository) {}

    async showPostByUserId(id: number) {
        const posts = await this.userRepo
                                .createQueryBuilder()
                                .select(["users.id as userId", "users.name as name", "users.profilePic as profilePic", 
                                "post.id as id", "post.description as description"])
                                .from(User, "users")
                                .leftJoin("users.posts", "post")
                                .where("users.id = :id", { id: id })
                                .orderBy("post.id", "DESC")
                                .getRawMany();

        return posts;
    }

    async createPost(createPostDto: CreatePostDto) {
        const { description, userId } = createPostDto;

        const user = await this.userRepo.findOneBy({
            id: userId
        })

        if (!user) {
            throw new UnauthorizedException("Don't have permit to post");
        }

        const post = new Post();
        post.description = description;
        post.user = user;

        await this.postRepo.save(post);
        return true;
    }
}