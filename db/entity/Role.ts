import { BaseEntity, Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Permission } from "./Permission";

@Entity()
export class Role extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({
        nullable: false, 
        type: 'enum', 
        enum: ['Admin', 'User', 'Editor'], 
        default: 'User'
    })
    name: "Admin" | "User" | "Editor";

    @ManyToMany(() => User, user => user.roles)
    users: User[];

    @ManyToMany(() => Permission, { cascade: true, eager: true })
    @JoinTable()
    permissions: Permission[];

}