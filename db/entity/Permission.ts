import { BaseEntity, Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToMany } from "typeorm";
import { Role } from "./Role";

@Entity()
export class Permission extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({
        type: 'enum', 
        enum: ['create_post', 'edit_user', 'delete_comment', 'view_post']
    })
    name: 'create_post' |'edit_user' | 'delete_comment' | 'view_post';
 
    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[];

}