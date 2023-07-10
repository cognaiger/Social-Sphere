import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from '../database/repositories/post.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { UserRepository } from '../database/repositories/user.repository';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';
import { CloudinaryService } from '../file/file.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [TypeOrmModule.
        forFeature([Post, User]),
        AuthModule,
        FileModule],
    controllers: [PostController],
    providers: [PostService, PostRepository, UserRepository, CloudinaryService]
})
export class PostModule {}
