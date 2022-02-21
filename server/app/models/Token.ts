import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Token extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false
    })
    token: string

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    created_at: string
}