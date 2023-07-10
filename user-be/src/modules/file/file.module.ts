import { Module } from "@nestjs/common";
import { CloudinaryService } from "./file.service";
import { FileController } from "./file.controller";

@Module({
    providers: [CloudinaryService],
    exports: [CloudinaryService],
    controllers: [FileController]
})
export class FileModule {

}