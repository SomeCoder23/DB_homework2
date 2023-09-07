import { BaseEntity, Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Profile } from "./Profile";
import { Role } from "./Role";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({length: 50, nullable: false})
    userName: string;

    @Column({nullable: false})
    password: string;

    @Column()
    email: string;

    @OneToOne(() => Profile, { cascade: true, eager: true })
    @JoinColumn()
    profile: Profile;

    // @ManyToMany(() => Role, role => role.users)
    // roles: Role[];

    @ManyToMany(() => Role, { cascade: true, eager: true })
    @JoinTable()
    roles: Role[];
}