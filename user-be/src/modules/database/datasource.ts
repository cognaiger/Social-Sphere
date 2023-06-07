import { User } from "src/entities/user.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "NewPassword",
    database: "social",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})