import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/createPost.dto";
import { AuthGuard } from "../auth/guard/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("post")
export class PostController {
    SERVER_URL: string = "http://localhost:2504/";
    constructor(private readonly postService: PostService) {}

    // @UseGuards(AuthGuard)
    @Get("getPost/:id")
    async showPostByUserId(@Param('id') id: number) {
        return this.postService.showPostByUserId(id);
    }

    // @UseGuards(AuthGuard)
    @Post("create")
    @UseInterceptors(FileInterceptor('file', 
    {
        storage: diskStorage({
            destination: './postPic',
            filename: (req, file, cb) =>{
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    async createPost(@Body() createPostDto: CreatePostDto, @UploadedFile() file: Express.Multer.File) {
        return this.postService.createPost(createPostDto, `${this.SERVER_URL}${file.path}`);
    }

    @Get('all')
    async getAllPost() {
        return await this.postService.getAllPost();
    }

    // @UseGuards(AuthGuard)
    @Get(':id')
    async getPostById(@Param('id') id: number) {
        return await this.postService.getPostById(id);
    }
}