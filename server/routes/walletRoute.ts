import { Router, Request, Response } from "express";
import { check } from "express-validator";
import { WalletController } from "../app/controllers/WalletController";


const walletController = new WalletController();
export default
    Router()

        .get("/", (req, res) => {
            walletController.index(req, res);
        })

        .get("/:id", (req, res) => {
            walletController.show(res, req.params.id);
        })

        .post("/",
            [
                check("balance")
                    .isFloat({ min: 0 }).withMessage("Limit mas be a number and greater than 0"),

                check("limit")
                    .isFloat({ min: 0 }).withMessage("Limit mas be a number and greater than 0"),

                check("description")
                    .isLength({ max: 64 }).withMessage("Length must low than 64"),
            ],
            (req: Request, res: Response) => {
                walletController.store(req, res);
            })

        .put("/:id",
            [
                check("balance")
                    .isFloat({ min: 0 }).withMessage("Limit mas be a number and greater than 0"),

                check("limit")
                    .isFloat({ min: 0 }).withMessage("Limit must be a number and greater than 0"),

                check("description")
                    .isLength({ max: 64 }).withMessage("Length must low than 64"),
            ],
            (req: Request, res: Response) => {
                walletController.update(req, res, req.params.id);
            })

        .delete("/:id", (req, res) => {
            walletController.destroy(res, req.params.id);
        })