import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from 'src/common/constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from '../database/repositories/user.repository';
import { AuthGuard } from './guard/auth.guard';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstant.secret,
            signOptions: { expiresIn: '60s' }
        }),
        TypeOrmModule.forFeature([
            User
        ])
    ],
    controllers: [AuthController],
    providers: [AuthService, UserRepository, AuthGuard],
    exports: [AuthGuard]
})
export class AuthModule {}
