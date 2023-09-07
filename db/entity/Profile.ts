import { BaseEntity, Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Profile extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({nullable: false})
    firstName: string;

    @Column({nullable: false})
    lastName: string;

    @Column({nullable: false, type: 'date'})
    dateOfBirth: Date;

}