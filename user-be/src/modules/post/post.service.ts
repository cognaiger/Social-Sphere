import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PostRepository } from "../database/repositories/post.repository";
import { CreatePostDto } from "./dto/createPost.dto";
import { Post } from "src/entities/post.entity";
import { UserRepository } from "../database/repositories/user.repository";
import { User } from "src/entities/user.entity";
import { CloudinaryService } from "../file/file.service";

@Injectable()
export class PostService {
    constructor(private readonly postRepo: PostRepository,
                private readonly userRepo: UserRepository,
                private readonly cloudinaryService: CloudinaryService) {}

    async showPostByUserId(id: number) {
        const posts = await this.userRepo
                                .createQueryBuilder()
                                .select(["users.id as userId", "users.name as name", "users.profilePic as profilePic", 
                                "post.id as id", "post.description as description", "post.createdAt as createdAt", "post.imgUrl as url"])
                                .distinct(true)
                                .from(User, "users")
                                .leftJoin("users.posts", "post")
                                .where("users.id = :id", { id: id })
                                .orderBy("post.id", "DESC")
                                .getRawMany();

        return posts;
    }

    async createPost(createPostDto: CreatePostDto, fileURL) {
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
        post.imgUrl = fileURL;

        /*
        try {
            if (file) {
                const uploadRes = await this.cloudinaryService.uploadImage(file);
                post.imgUrl = uploadRes.imgUrl;
                console.log(uploadRes.imgUrl);
            }
        } catch (error) {
            console.error("There was an error uploading the file: ", error);
        }
        */

        const insert = await this.postRepo.save(post);
        return insert.id;
    }

    async getPostById(id: number) {
        const post = await this.postRepo
                            .createQueryBuilder()
                            .select(["posts.description as description", "posts.createdAt as createdAt", "posts.imgUrl as url", 
                                    "users.name as name", "users.profilePic as profilePic"])
                            .from(Post, "posts")
                            .leftJoin("posts.user", "users") 
                            .where("posts.id = :id", { id: id })
                            .getRawOne();


        return post;
    }

    async getAllPost() {
        const posts = await this.userRepo
                        .createQueryBuilder()
                        .select(["users.id as userId", "users.name as name", "users.profilePic as profilePic", 
                        "post.id as id", "post.description as description", "post.createdAt as createdAt", "post.imgUrl as url"])
                        .distinct(true)
                        .from(User, "users")
                        .leftJoin("users.posts", "post")
                        .orderBy("post.id", "DESC")
                        .getRawMany();

        return posts;
    }
}