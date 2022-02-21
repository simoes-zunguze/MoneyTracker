import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { getRepository, Not } from "typeorm";
import { Category } from "../models/Category";
import { User } from "../models/User";
import { ApiController } from "./IController";
import timestamp from "time-stamp"
export default class CategoryController implements ApiController {
    async index(req: Request, res: Response) {
        const userId = res.locals.user.id;
        try {
            const categories = await getRepository(Category)
                .createQueryBuilder("category")
                .innerJoin("category.user", "user")
                .where("user.id = :userId", { userId })
                .getMany();

            return res.send(categories);
        } catch (error) {
            res.status(500).send();
        }
    }

    async store(req: Request<any, any, Category | any>, res: Response<any, Record<string, any>>) {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const userId = res.locals.user.id;
        const categoryName = req.body.name;

        const categories = await getRepository(Category)
            .createQueryBuilder("category")
            .innerJoin("category.user", "user")
            .where("category.name = :categoryName", { categoryName })
            .andWhere("user.id = :userId", { userId })
            .getMany();

        if (categories.length > 0) {
            return res.status(400).json({ error: { name: "name already exists" } });
        } else {
            try {
                let category = new Category();
                category.name = req.body.name;
                category.description = req.body.description;
                category.user = await User.findOne(res.locals.user.id) as User;
                category.created_at = timestamp('YYYY-MM-DD HH:mm:ss');
                category.limit = req.body.limit;
                category = await category.save();
                return res.status(201).send(category);
            } catch (error) {
                return res.status(500).send();
                console.error(error);
            }
        }
    }

    async update(req: Request<any, any, Category>, res: Response, id: string | number) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userId = res.locals.user.id;
        const categoryName = req.body.name;

        try {
            const categories = await getRepository(Category)
                .createQueryBuilder("category")
                .innerJoin("category.user", "user")
                .where("category.name = :categoryName", { categoryName })
                .andWhere("category.id != :id", { id })
                .andWhere("user.id = :userId", { userId })
                .getMany();
            if (categories.length > 0) {
                return res.status(400).json({ error: { code: "001", name: "name already exists" } });
            } else {
                let category = await Category.findOne(id);
                if (category) {
                    category.name = req.body.name;
                    category.description = req.body.description;
                    category.limit = req.body.limit;
                    category = await category.save();
                    return res.status(200).json(category);
                } else {
                    return res.status(404).send();
                }
            }
        } catch (error) {
            return res.status(500).send();
            console.error(error);
        }
    }
    async show(res: Response<any, Record<string, any>>, id: string | number) {
        const userId = res.locals.user.id;
        try {
            const category = await getRepository(Category)
                .createQueryBuilder("category")
                .innerJoin("category.user", "user")
                .where("category.id = :id", { id })
                .andWhere("user.id = :userId", { userId })
                .getOne();

            if (category) {
                return res.send(category);
            } else {
                return res.status(404).send();
            }
        } catch (error) {
            return res.status(500).send();
            console.error(error);
        }
    }

    async destroy(res: Response, id: string | number) {
        const userId = res.locals.user.id;

        try {
            const category = await getRepository(Category)
                .createQueryBuilder("category")
                .innerJoin("category.user", "user")
                .where("category.id = :id", { id })
                .andWhere("user.id = :userId", { userId })
                .getOne();
            if (category) {
                await category.remove();
                return res.status(200).send();
            } else {
                return res.status(404).send();
            }
        } catch (error) {
            return res.status(500).send();
            console.error(error);
        }
    }
}