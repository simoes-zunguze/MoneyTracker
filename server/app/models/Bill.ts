import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { User } from "./User";
import { Wallet } from "./Wallet";

@Entity()
export class Bill extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "float"
    })
    amount: number

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

    @ManyToOne(type => User, user => user.bills, { nullable: false })
    user: User

    @ManyToOne(type => Category, category => category.bills, { nullable: false, onDelete: "CASCADE" })
    category: Category

    @ManyToOne(type => Wallet, wallet => wallet.bills, { nullable: false, onDelete: "CASCADE" })
    wallet: Wallet
}