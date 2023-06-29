import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/createPost.dto";

@Controller("post")
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    showAllPost() {
        return "show all post";
    }

    @Post("create")
    async createPost(@Body() createPostDto: CreatePostDto) {
        return this.postService.createPost(createPostDto);
    }

    @Get(':id')
    getPostById(@Param('id') id: string) {
        return "return  post by id";
    }
}