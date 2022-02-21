import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Bill } from "./Bill";
import { Category } from "./Category";
import { Wallet } from "./Wallet";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        default: true,
        select: false
    })
    isActive: boolean;

    @Column({
        unique:true
    })
    email: string

    @Column({
        select: false
    })
    password: string

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
        select: false
    })    
    updated_at: string
    
    @Column({
        type: "timestamp",
    })
    created_at: string

    @OneToMany(type => Wallet, wallet => wallet.user)
    wallets: Wallet[]


    @OneToMany(type => Bill, bill => bill.user)
    bills: Bill[]


    @OneToMany(type => Category, category => category.user)
    categories: Category[]
}
