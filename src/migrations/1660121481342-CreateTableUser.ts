import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreateTableUser1660121481342 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user", columns: [
                {
                    name: "id", type: "int", isPrimary: true,generationStrategy: 'increment',isGenerated:true
                },
                {
                    name: 'login', type: "varchar"
                },

                {
                    name: 'password', type: "text"
                },

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
