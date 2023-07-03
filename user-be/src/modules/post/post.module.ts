import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from '../database/repositories/post.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { UserRepository } from '../database/repositories/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.
        forFeature([Post, User]),
            AuthModule],
    controllers: [PostController],
    providers: [PostService, PostRepository, UserRepository]
})
export class PostModule {}
