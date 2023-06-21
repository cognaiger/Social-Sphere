import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class UpdateUser1687320494135 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "user",
            new TableColumn({
                name: "profilePic",
                type: "varchar(300)"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(
            "user", "profilePic"
        )
    }

}
