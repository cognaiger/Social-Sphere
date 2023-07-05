import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/createPost.dto";
import { AuthGuard } from "../auth/guard/auth.guard";

@Controller("post")
export class PostController {
    constructor(private readonly postService: PostService) {}

    @UseGuards(AuthGuard)
    @Get("getPost/:id")
    async showPostByUserId(@Param('id') id: number) {
        return this.postService.showPostByUserId(id);
    }

    @UseGuards(AuthGuard)
    @Post("create")
    async createPost(@Body() createPostDto: CreatePostDto) {
        return this.postService.createPost(createPostDto);
    }

    // @UseGuards(AuthGuard)
    @Get(':id')
    async getPostById(@Param('id') id: number) {
        return await this.postService.getPostById(id);
    }
}