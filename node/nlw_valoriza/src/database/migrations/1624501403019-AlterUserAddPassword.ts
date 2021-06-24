import {MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserAddPassword1624501403019 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "password",
                type: "varchar",
                isNullable: true //forma de permitir que a migration funcione com usuarios ja cadastrados, pois password poderia ser obrigatorio
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "password")
    }

}
