import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        length: 30
    })
    username: string

    @Column({
        nullable: false,
        length: 30
    })
    email: string

    @Column({
        nullable: false,
        length: 100
    })
    pass: string

    @Column({
        nullable: false,
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
}