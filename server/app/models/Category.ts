import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Bill } from "./Bill";
import { Expense } from "./Expense";
import { User } from "./User";

@Entity()
export class Category extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false
    })
    name: string

    @Column({
        nullable: true
    })
    description: string
    
    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updated_at: string

    @Column({
        type: "timestamp",
    })
    created_at: string


    @Column({
        default:0,
        type: "float"
    })
    limit: number

    @OneToMany(type => Expense, incoming => incoming.category)
    expenses: Expense[]

    @OneToMany(type => Bill, bill => bill.category)
    bills: Bill[]

    @ManyToOne(type => User, user => user.categories, { nullable: false, onDelete: "CASCADE"})
    user: User

}