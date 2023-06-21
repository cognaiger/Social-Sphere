import { ConfigService } from "@nestjs/config"
import { config } from "dotenv";
import { User } from "src/entities/user.entity";
import { DataSource } from "typeorm";
import { UpdateUser1687320494135 } from "src/migrations/1687320494135-UpdateUser";
 
config();
 
const configService = new ConfigService();
 
export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [User],
  migrations: [UpdateUser1687320494135]
});