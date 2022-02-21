import { Response, Request } from "express";
import { ApiController } from "./IController";
import { Expense } from "../models/Expense";
import { Wallet } from "../models/Wallet";
import { Category } from "../models/Category";
import { validationResult } from "express-validator";
import { getRepository } from "typeorm";
import timestamp from "time-stamp";
export class ExpenseController implements ApiController {

    async index(req: Request,res: Response) {
        let month:string;
        if (req.query.date) {
            month = (new Date(req.query.date as string).getMonth()+1).toString();
        }else{
            month = (new Date().getMonth()+1).toString();
        }
        
        try {
            const userId = res.locals.user.id;
            const expenses = await getRepository(Expense)
                .createQueryBuilder("expense")
                .innerJoinAndSelect("expense.wallet", "wallet")
                .innerJoinAndSelect("expense.category", "category")
                .innerJoin("wallet.user", "user")
                .where("user.id = :userId", { userId })
                .andWhere("MONTH(expense.created_at) = :month", { month })

                .getMany();
            return res.send(expenses);
        } catch (error) {
            console.error(error);
            return res.status(500).send();
        }
    }

    async store(req: Request<any, any, Expense>, res: Response) {
      
        try {
            let expense = new Expense();
            expense.description = req.body.description;
            expense.amount = req.body.amount;

            //Adjusts the wallet balance
            const wallet = await Wallet.findOne(req.body.wallet) as Wallet;
            wallet.balance = wallet.balance - expense.amount * 1.00;

            expense.wallet = wallet;
            expense.category = await Category.findOne(req.body.category) as Category;
            expense.created_at = timestamp('YYYY-MM-DD HH:mm:ss');
            await wallet.save();
            expense = await expense.save();
            return res.status(201).json(expense)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "internal server error" })
        }
    }

    async update(req: Request<any, any, Expense>, res: Response, id: string | number) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let expense = await Expense.findOne(id, { relations: ["wallet"] });
            if (expense) {
                expense.description = req.body.description;
                const wallet = await Wallet.findOne(expense.wallet.id) as Wallet;

                //Adjusts the wallet balance
                wallet.balance = wallet.balance + expense.amount * 1.00;
                wallet.balance = wallet.balance - req.body.amount * 1.00;

                expense.amount = req.body.amount;

                await wallet.save();
                expense = await expense.save();
                return res.status(200).json(expense)
            } else {
                return res.status(404).json({ error: "Not found" })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "internal server error" })
        }
    }

    show(res: Response, id: string | number): void {
        Expense.findOne(id, { relations: ["category", "wallet"] }).then((expense) => {
            if (expense) {
                res.json(expense);
            } else {
                res.status(404).json({ error: "Not found" })
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({ error: "internal server error" })
        })
    }

    async destroy(res: Response, id: string | number) {
        const expense = await Expense.findOne(id, { relations: ["wallet"] });

        if (expense) {
            const wallet = await Wallet.findOne(expense.wallet.id) as Wallet;
            wallet.balance = wallet.balance + expense.amount * 1.00;
            await wallet.save();
            await expense.remove();
            return res.status(200).json({ success: "Deleted" })
        } else {
            return res.status(404).json({ error: "Not Found" });
        }
    }

}