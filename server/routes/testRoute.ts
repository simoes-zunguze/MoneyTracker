import { Router, Request, Response } from "express";
import TestController from "../app/controllers/TestController";
import { testMiddliwate } from "../app/middlewares/testMidleware";

const testController = new TestController();
export default

Router()

.get("/", testMiddliwate, (req: Request, res: Response)=>{
    testController.index(req, res);
})