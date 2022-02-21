import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./Wallet";

@Entity()
export class Incoming extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    // @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    @Column({
        type: "float"
    })
    amount: number

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

    @Column({
        nullable: true
    })
    description: string

    @ManyToOne(type => Wallet, wallet => wallet.incomings, { nullable: false, onDelete: "CASCADE"})
    wallet: Wallet

}