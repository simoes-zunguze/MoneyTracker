import { Request, Response } from "express";

export interface IController{

}

export interface  ApiController extends IController{
     index(req: Request, res: Response): void;
     store(req:Request, res: Response): void;
     update(req:Request, res: Response, id: string | number): void;
     show(res: Response, id: string | number): void;
     destroy(res: Response, id: string | number): void;
}  
