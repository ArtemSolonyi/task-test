import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column()
    login: string
    @Column()
    password: string
}

