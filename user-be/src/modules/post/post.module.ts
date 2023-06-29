import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from '../database/repositories/post.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';

@Module({
    imports: [TypeOrmModule.
        forFeature([Post])],
    controllers: [PostController],
    providers: [PostService, PostRepository]
})
export class PostModule {}
