import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCompliments1624504610765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: "compliments",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "user_sender",
                    type: "uuid",
                },
                {
                    name: "user_receiver",
                    type: "uuid",
                },
                {
                    name: "tag_id",
                    type: "uuid"
                },
                {
                    name: "message",
                    type: "varchar"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                    name: "FKUserSenderCompliments", //nome da FK
                    referencedTableName: "users", //qual tabela o valor tem partida
                    referencedColumnNames: ["id"], //qual a coluna do valor da tabela
                    columnNames: ["user_sender"], //qual a coluna da tabela atual devera ser uma FK
                    onDelete: "SET NULL", //definir valores nulos em caso de remocao
                    onUpdate: "SET NULL" //definir valores nulos em caso de atualizacao
                },
                {
                    name: "FKUserReceiverCompliments", //nome da FK
                    referencedTableName: "users", //qual tabela o valor tem partida
                    referencedColumnNames: ["id"], //qual a coluna do valor da tabela
                    columnNames: ["user_receiver"], //qual a coluna da tabela atual devera ser uma FK
                    onDelete: "SET NULL", //definir valores nulos em caso de remocao
                    onUpdate: "SET NULL" //definir valores nulos em caso de atualizacao
                },
                {
                    name: "FKTagCompliments", //nome da FK
                    referencedTableName: "tags", //qual tabela o valor tem partida
                    referencedColumnNames: ["id"], //qual a coluna do valor da tabela
                    columnNames: ["tag_id"], //qual a coluna da tabela atual devera ser uma FK
                    onDelete: "SET NULL", //definir valores nulos em caso de remocao
                    onUpdate: "SET NULL" //definir valores nulos em caso de atualizacao
                }
            ]
        }));

        /* queryRunner.createForeignKey(
            "compliments",
            new TableForeignKey({
                name: "FKUserSenderCompliments", 
                referencedTableName: "users", 
                referencedColumnNames: ["id"], 
                columnNames: ["user_sender"], 
                onDelete: "SET NULL", 
                onUpdate: "SET NULL"
            })
        ) */ //outra forma de criar FK
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments");
    }

}
