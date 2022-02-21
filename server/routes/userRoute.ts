import { Router, Request, Response } from "express";
import { UserController } from "../app/controllers/UserController";
const userController = new UserController();

export default
Router()
.get("/", (req: Request, res: Response)=>{
    userController.index(req, res);
})
.get("/:id", (req: Request<{id:number}>, res: Response)=>{
    userController.show(res, req.params.id);
})
.post("/", (req: Request, res: Response)=>{
    userController.store(req, res);
})
.put("/:id", (req: Request, res: Response)=>{
    userController.update(req, res, req.params.id);
})
.delete("/:id", (req: Request, res: Response)=>{
    userController.destroy(res, req.params.id);
})