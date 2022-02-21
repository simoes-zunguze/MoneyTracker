import { Router, Request, Response } from "express";
import { BillController } from "../app/controllers/BillController";
import { check } from "express-validator";

const billController = new BillController();

export default
    Router()
        .get("/", (req, res) => {
            billController.index(req,res);
        })

        .get("/:id", (req, res) => {
            billController.show(res, req.params.id);
        })

        .post("/",
            [
                check("amount")
                    .isFloat({ min: 0 }).withMessage("Limit mas be a number and greater than 0"),

                check("description")
                    .isLength({ max: 64 }).withMessage("Length must low than 64"),
            ],
            (req: Request, res: Response) => {
                billController.store(req, res);
            })

        .put("/:id",
            [
                check("amount")
                    .isFloat({ min: 0 }).withMessage("Limit mas be a number and greater than 0"),

                check("description")
                    .isLength({ max: 64 }).withMessage("Length must low than 64"),
            ],
            (req: Request, res: Response) => {
                billController.update(req, res, req.params.id);
            })

        .delete("/:id", (req, res) => {
            billController.destroy(res, req.params.id);
        })