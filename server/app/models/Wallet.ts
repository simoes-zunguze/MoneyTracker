import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bill } from "./Bill";
import { Expense } from "./Expense";
import { Incoming } from "./Incoming";
import { User } from "./User";

enum WalletType {
    CREDIT = "credit",
    DEBIT = "debit",
    CASH= "cash"
}
@Entity()
export class Wallet extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    // @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    @Column({
        type: "float"
    })
    balance: number

    @Column({
        type: "float",
        default: 0
    })
    limit: number

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
        type: "enum",
        enum: WalletType,
        default: WalletType.DEBIT
    })
    type: WalletType
    
    @ManyToOne(type => User, user => user.wallets, { nullable: false, onDelete: "CASCADE"})
    user: User

    @OneToMany(type => Incoming, incoming => incoming.wallet)
    incomings: Incoming[]

    @OneToMany(type => Expense, expense => expense.wallet)
    expenses: Expense[]


    @OneToMany(type => Bill, bill => bill.wallet)
    bills: Bill[]
}

export { WalletType }