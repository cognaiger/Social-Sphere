import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: "user_id"
    })
    userId: number

    @Column({
        name: "description",
        nullable: true
    })
    description: string

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
}