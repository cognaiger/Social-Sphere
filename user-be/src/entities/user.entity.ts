import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 30
    })
    username: string

    @Column({
        length: 30
    })
    email: string

    @Column({
        length: 100
    })
    pass: string

    @Column({
        length: 30
    })
    name: string

    @CreateDateColumn({
        name: "created_at"
    })
    createdAt: Date

    @UpdateDateColumn({
        name: "updated_at"
    })
    updatedAt: Date

    @DeleteDateColumn({
        name: "deleted_at"
    })
    deletedAt: Date

    @Column({
        name: "profilePic",
        default: "https://i.pinimg.com/originals/a4/af/12/a4af1288eab8714320fa8453f72d79fd.jpg"
    })
    profilePic: string

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]
}