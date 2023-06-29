import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
        nullable: true
    })
    profilePic: string
}