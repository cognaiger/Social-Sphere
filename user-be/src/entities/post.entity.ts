import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.posts)
    user: User

    @Column({
        name: "description"
    })
    description: string

    @CreateDateColumn({
        name: "created_at"
    })
    createdAt: Date

    @UpdateDateColumn({
        name: "updated_at",
        nullable: true
    })
    updatedAt: Date

    @DeleteDateColumn({
        name: "deleted_at",
        nullable: true
    })
    deletedAt: Date
}