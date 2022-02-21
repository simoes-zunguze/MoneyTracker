import { Column, PrimaryGeneratedColumn, ManyToOne, Entity, BaseEntity } from "typeorm";
import { Category } from "./Category";
import { Wallet } from "./Wallet";

@Entity()
export class Expense extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    // @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    @Column()
    amount: number

    @Column({
        default: 1
    })
    
    quant: number
    @Column()
    description: string

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updated_at: string
    
    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    created_at: string

    @ManyToOne(type => Category, category => category.expenses, { nullable: false, onDelete: "CASCADE"})
    category: Category

    @ManyToOne(type => Wallet, wallet => wallet.expenses, { nullable: false, onDelete: "CASCADE"})
    wallet: Wallet
}