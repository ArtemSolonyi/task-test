import {Column, MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreateTemplate1663767344567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "template", columns: [{
                name: "id", type: "int", isPrimary: true, generationStrategy: 'increment', isGenerated: true,
            },
                {
                    name: 'templateId', type: 'int',
                },
                {
                    name: 'title', type: "text"
                },
                {
                    name: 'blockType', type: "varchar"
                },
                {
                    name: 'rowCount', type: "int"
                },
                {
                    name: 'pointId', type: "int"
                },
                {
                    name: 'pointNameNts', type: "text"
                },
                {
                    name: 'tankId', type: "int"
                },
                {
                    name: 'tankUID', type: "varchar"
                },
                {
                    name: 'productUidNts', type: "int"
                },
                {
                    name: 'productNameNts', type: "text"
                },
                {
                    name: 'fuelVolumeByProbe', type: "int"
                },
                {
                    name: 'fuelVolumeByManual', type: "int"
                },
                {
                    name: 'fuelVolumeAppend', type: "int"
                },
                {
                    name: 'tProbeBroken', type: "bool"
                },
                {
                    name: 'isProbeBroken', type: "int"
                },
                {
                    name: 'isProductUidChanged', type: "int"
                },
                {
                    name: 'dClient', type: "int"
                },
                {
                    name: 'tClient', type: "time"
                },
                {
                    name: 'dtCreate', type: "date"
                },
                {
                    name: 'probeSerial', type: "varchar"
                },

            ],
        },),)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
