import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 } from "cloudinary";

@Injectable()
export class CloudinaryService {
    constructor (private configServie: ConfigService) {
        v2.config({
            cloud_name: this.configServie.get('CLOUDINARY_NAME'),
            api_key: this.configServie.get('CLOUDINARY_API_KEY'),
            api_secret: this.configServie.get('CLOUDINARY_API_SECRET'),
        });
    }

    async uploadImage(image: Express.Multer.File): Promise<any> {
        return new Promise((resolve, reject) => {
            v2.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(image.buffer);
        });
    }
}