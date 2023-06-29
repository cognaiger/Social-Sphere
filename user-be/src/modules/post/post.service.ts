import { Injectable } from "@nestjs/common";
import { PostRepository } from "../database/repositories/post.repository";
import { CreatePostDto } from "./dto/createPost.dto";
import { Post } from "src/entities/post.entity";

@Injectable()
export class PostService {
    constructor(private readonly postRepo: PostRepository) {}

    showPost() {

    }

    async createPost(createPostDto: CreatePostDto) {
        const { description, userId } = createPostDto;

        const post = new Post();
        post.description = description;
        post.userId = userId;

        await this.postRepo.save(post);
        return true;
    }
}