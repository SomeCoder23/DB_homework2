import { BaseEntity, Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({length: 50, nullable: false})
    userName: string;

    @Column({nullable: false})
    password: string;

}