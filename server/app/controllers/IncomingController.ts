import { Response, Request } from "express";
import { ApiController } from "./IController";
import { Incoming } from "../models/Incoming";
import { Wallet } from "../models/Wallet";
import { validationResult } from "express-validator";
import { getRepository } from "typeorm";
import timestamp from "time-stamp";
export class IncomingController implements ApiController {
    async index(req: Request, res: Response) {

        let month:string;
        if (req.query.date) {
            month = (new Date(req.query.date as string).getMonth()+1).toString();
        }else{
            month = (new Date().getMonth()+1).toString();
        }
        console.log(month);
        
        const userId = res.locals.user.id;
        try {
            const incomes = await getRepository(Incoming)
                .createQueryBuilder("incoming")
                .innerJoinAndSelect("incoming.wallet", "wallet")
                .innerJoin("wallet.user", "user")
                .where("user.id = :userId", { userId })
                .andWhere("MONTH(incoming.created_at) = :month", {month})
                .getMany();

            return res.send(incomes);
        } catch (error) {
            console.error(error);
            return res.status(500).send();
        }
    }

    async store(req: Request<any, any, Incoming>, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let incoming = new Incoming();
            incoming.description = req.body.description;
            incoming.amount = req.body.amount;
            incoming.created_at = timestamp('YYYY-MM-DD HH:mm:ss');
            const wallet = await Wallet.findOne(req.body.wallet) as Wallet;
            incoming.wallet = wallet;
            wallet.balance = (wallet.balance as number) + (incoming.amount as number) * 1.0;

            await wallet.save();
            incoming = await incoming.save();

            res.status(201).json(incoming)
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "internal server error" })
        }
    }

    async update(req: Request<any, any, Incoming>, res: Response, id: string | number) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let incoming = await Incoming.findOne<Incoming>(id, { relations: ["wallet"] });

            if (incoming) {
                incoming.description = req.body.description;
                const wallet = await Wallet.findOne(incoming.wallet.id) as Wallet;
                incoming.wallet = wallet;
                wallet.balance = wallet.balance - incoming.amount * 1.0;
                wallet.balance = wallet.balance + req.body.amount * 1.0;
                incoming.amount = req.body.amount;

                await wallet.save();
                incoming = await incoming.save();

                return res.status(200).json(incoming)
            } else {
                return res.status(404).json({ error: "Not found" })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "internal server error" })
        }
    }

    show(res: Response, id: string | number): void {
        Incoming.findOne(id, { relations: ["wallet"] }).then((incoming) => {
            if (incoming) {
                res.json(incoming);
            } else {
                res.status(404).json({ error: "Not found" })
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({ error: "internal server error" })
        })
    }

    async destroy(res: Response, id: string | number) {
        const incoming = await Incoming.findOne(id, { relations: ["wallet"] });
        if (incoming) {
            const wallet = await Wallet.findOne(incoming.wallet.id) as Wallet;
            wallet.balance = wallet.balance - incoming.amount;
            await wallet.save();
            await incoming.remove();
            return res.status(200).json({ success: "Deleted" })
        } else {
            return res.status(404).json({ error: "Not Found" });
        }
    }

}