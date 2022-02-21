import { Response, Request } from "express";
import { ApiController } from "./IController";
import { Bill } from "../models/Bill";
import { Wallet } from "../models/Wallet";
import { Category } from "../models/Category";
import { User } from "../models/User";
import { validationResult } from "express-validator"
import { getRepository } from "typeorm";
import timestamp from "time-stamp";
export class BillController implements ApiController {
    async index(req: Request, res: Response) {
        const userId = res.locals.user.id;
        try {
            const bills = await getRepository(Bill).createQueryBuilder("bill")
                .innerJoin("bill.user", "user")
                .innerJoinAndSelect("bill.category", "category")
                .innerJoinAndSelect("bill.wallet", "wallet")
                .where("user.id = :userId", {userId})
                .getMany()
            res.send(bills);
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }

    async store(req: Request<any, any, Bill>, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const userId = res.locals.user.id;

        try {
            let bill = new Bill();
            bill.description = req.body.description;
            bill.amount = req.body.amount;
            bill.created_at = timestamp('YYYY-MM-DD HH:mm:ss');
            bill.category = await Category.findOne(req.body.category) as Category;
            bill.wallet = await Wallet.findOne(req.body.wallet) as Wallet;

            bill.user = await User.findOne(userId) as User;

            bill = await bill.save();
            return res.status(201).json(bill)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "internal server error" })
        }
    }

    async update(req: Request<any, any, Bill>, res: Response, id: string | number) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let bill = await Bill.findOne(id);
            if (bill) {
                bill.description = req.body.description;
                bill.category = await Category.findOne(req.body.category) as Category;
                bill.amount = req.body.amount;
                bill = await bill.save();
                res.status(200).json(bill)
            } else {
                return res.status(404).json({ error: "Not found" })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "internal server error" })
        }
    }

    show(res: Response, id: string | number): void {
        Bill.findOne(id).then((bill) => {
            if (bill) {
                res.json(bill);
            } else {
                res.status(404).json({ error: "Not found" })
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({ error: "internal server error" })
        })
    }

    async destroy(res: Response, id: string | number) {
        const bill = await Bill.findOne(id);
        if (bill) {
            await bill.remove();
            return res.status(200).json({ success: "Deleted" })
        } else {
            return res.status(404).json({ error: "Not Found" });
        }
    }
}