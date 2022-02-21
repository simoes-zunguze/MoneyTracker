import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { ExpenseController } from "../app/controllers/ExpenseController";

const expenseController = new ExpenseController();
export default
    Router()

        .get("/", (req, res) => {
            expenseController.index(req, res);
        })

        .get("/:id", (req, res) => {
            expenseController.show(res, req.params.id);
        })

        .post("/",
            [
                check("amount")
                    .isFloat({ min: 0 }).withMessage("Limit mas be a number and greater than 0"),

                check("description")
                    .isLength({min:1, max: 64 }).withMessage("Length must be min:1 and max:64 characters"),
            ],
            (req: Request, res: Response) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }        
                expenseController.store(req, res);
            })

        .put("/:id",
            [
                check("amount")
                    .isFloat({ min: 0 }).withMessage("Limit mas be a number and greater than 0"),

                check("description")
                    .isLength({min:1, max: 64 }).withMessage("Length must be min:1 and max:64 characters"),
            ],
            (req: Request, res: Response) => {
                expenseController.update(req, res, req.params.id);
            })

        .delete("/:id", (req, res) => {
            expenseController.destroy(res, req.params.id);
        })