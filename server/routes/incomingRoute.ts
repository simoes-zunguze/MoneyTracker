import { Router, Request, Response } from "express";
import { check } from "express-validator";
import { IncomingController } from "../app/controllers/IncomingController";

const incomingController = new IncomingController();
export default
    Router()

        .get("/", (req, res) => {
            incomingController.index(req, res);
        })

        .get("/:id", (req, res) => {
            incomingController.show(res, req.params.id);
        })

        .post("/",
            [
                check("amount")
                    .isFloat({ min: 0 }).withMessage("Limit mas be a number and greater than 0"),

                check("description")
                    .isLength({ max: 64 }).withMessage("Length must low than 64"),
            ],
            (req: Request, res: Response) => {
                incomingController.store(req, res);
            })

        .put("/:id",
            [
                check("amount")
                    .isFloat({ min: 0 }).withMessage("Limit mas be a number and greater than 0"),

                check("description")
                    .isLength({ max: 64 }).withMessage("Length must low than 64"),
            ],
            (req: Request, res: Response) => {
                incomingController.update(req, res, req.params.id);
            })

        .delete("/:id", (req, res) => {
            incomingController.destroy(res, req.params.id);
        })