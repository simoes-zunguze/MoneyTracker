import e, { Response, Request } from "express";
import { ApiController } from "./IController";
import { Wallet, WalletType } from "../models/Wallet";
import { User } from "../models/User";
import { validationResult } from "express-validator";
import { getRepository } from "typeorm";
import timestamp from "time-stamp";
export class WalletController implements ApiController {
    async index(req: Request,res: Response) {
        const userId = res.locals.user.id;
        try {
            const wallets = await getRepository(Wallet)
                .createQueryBuilder("wallet")
                .innerJoin("wallet.user", "user")
                .where("user.id = :userId", { userId })
                .getMany();

            res.send(wallets);
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }

    async store(req: Request<any, any, Wallet>, res: Response) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userId = res.locals.user.id;
        const description = req.body.description;

        const wallets = await getRepository(Wallet)
            .createQueryBuilder("wallet")
            .innerJoin("wallet.user", "user")
            .where("user.id = :userId", { userId })
            .andWhere("wallet.description = :description", { description })
            .getCount();

        if (wallets > 0) {
            return res.status(400).json({ error: { description: "description already exists" } });
        } else {
            try {
                let wallet = new Wallet();
                wallet.balance = req.body.balance;
                wallet.limit = req.body.limit;
                wallet.description = req.body.description;
                wallet.created_at = timestamp('YYYY-MM-DD HH:mm:ss');
                wallet.user = await User.findOne(userId) as User;
                wallet.type = req.body.type;


                wallet = await wallet.save();
                return res.status(201).json(wallet)
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "internal server error" })
            }
        }
    }

    async update(req: Request, res: Response, id: string | number) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userId = res.locals.user.id;
        const description = req.body.description;
        const wallets = await getRepository(Wallet)
            .createQueryBuilder("wallet")
            .innerJoin("wallet.user", "user")
            .where("user.id = :userId", { userId })
            .andWhere("wallet.id != :id", { id })
            .andWhere("wallet.description = :description", { description })
            .getCount();

        if (wallets > 0) {
            return res.status(400).json({ error: { description: "description already exists" } });
        } else {
            try {
                let wallet = await Wallet.findOne<Wallet>(id);
                if (wallet) {
                    wallet.balance = req.body.balance;
                    wallet.limit = req.body.limit;
                    wallet.description = req.body.description;
                    wallet = await wallet.save();
                    return res.status(200).json(wallet)
                } else {
                    return res.status(404).json({ error: "Not found" })
                }
            }

            catch (error) {
                console.log(error);
                return res.status(500).json({ error: "internal server error" })
            }
        }
    }

    async show(res: Response, id: string | number) {
        const userId = res.locals.user.id;

        try {
            const wallet = await getRepository(Wallet)
                .createQueryBuilder("wallet")
                .innerJoin("wallet.user", "user")
                .where("user.id = :userId", { userId })
                .andWhere("wallet.id = :id", { id }).getOne();
            if (wallet)
                return res.send(wallet)
            else
                return res.status(404).json({ error: "Not found" })

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "internal server error" })
        }
    }

    async destroy(res: Response, id: string | number) {
        const userId = res.locals.user.id;

        try {
            const wallet = await getRepository(Wallet)
                .createQueryBuilder("wallet")
                .innerJoin("wallet.user", "user")
                .where("user.id = :userId", { userId })
                .andWhere("wallet.id = :id", { id }).getOne();
            if (wallet) {
                await wallet.remove();
                return res.send({ success: "Deleted" })
            } else {
                return res.status(404).json({ error: "Not found" })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "internal server error" })
        }
    }

}