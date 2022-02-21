import { NextFunction, Request, Response } from "express";
import connectDatabase from "../../config/database";

export async function  testMiddliwate(req: Request, res: Response, next:NextFunction){
    await connectDatabase()
    next();
}