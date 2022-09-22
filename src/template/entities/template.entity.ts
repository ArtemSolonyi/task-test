import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Template {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    rowCount:number
    @Column()
    blockType: string
    @Column({select:false})
    templateId:number
    @Column({select:false})
    pointId: number
    @Column()
    pointNameNts: number
    @Column()
    tankId: number
    @Column()
    tankUID: number
    @Column()
    productUidNts: number
    @Column()
    productNameNts:string
    @Column()
    fuelVolumeByProbe: number
    @Column()
    fuelVolumeByManual: number
    @Column()
    fuelVolumeAppend: number
    @Column()
    isProbeBroken: number
    @Column()
    tProbeBroken: number
    @Column()
    isProductUidChanged: number
    @Column()
    dClient: Date
    @Column()
    tClient:string
    @Column()
    dtCreate: Date
    @Column()
    probeSerial: number

}
