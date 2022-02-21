import { Request, Response, Router } from "express";
import { check } from "express-validator";
import CategoryController from "../app/controllers/CategoryController";

const categoryController = new CategoryController();
export default
    Router()

        .get("/", (req, res) => {
            categoryController.index(req, res);
        })

        .get("/:id", (req, res) => {
            categoryController.show(res, req.params.id);
        })

        .post("/",
            [
                check("name")
                    .notEmpty().withMessage("Can not be empty")
                    .isLength({ min: 2, max: 16 }).withMessage("Length must be greater than 2 and low than 16"),

                check("limit")
                    .isFloat({ min: 0 }).withMessage("Limit mas be a number and greater than 0"),

                check("description")
                    .isLength({ max: 64 }).withMessage("Length must low than 64"),
            ],
            (req: Request, res: Response) => {
                categoryController.store(req, res);
            })

        .put("/:id",
            [
                check("name")
                    .notEmpty().withMessage("Can not be empty")
                    .isLength({ min: 2, max: 16 }).withMessage("Length must be greater than 2 and low than 16"),

                check("limit")
                    .isFloat({ min: 0 }).withMessage("Limit must be a number and greater than 0"),

                check("description")
                    .isLength({ max: 64 }).withMessage("Length must low than 64"),
            ],
            (req: Request, res: Response) => {
                categoryController.update(req, res, req.params.id);
            })

        .delete("/:id", (req, res) => {
            categoryController.destroy(res, req.params.id);
        })