import { Response, Request } from "express";
import { User } from "../models/User";
import { ApiController } from "./IController";
import bcrypt from "bcrypt"
import timestamp from "time-stamp";
export class UserController implements ApiController{
    index(req: Request,res: Response): void {
        User.find().then((user)=>{
            res.json(user);
        }).catch(error => {
            console.log(error);
            res.status(500).json({error: "interna server error"})
        })
    
    }
    
    async store(req: Request<any, any, User>, res: Response) {
        if( await this.existsEmail(req.body.email) ){
                return res.status(400).json({email: `email ${req.body.email} already exists`})
        }
        try {
            let user = new User();
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.created_at = timestamp('YYYY-MM-DD HH:mm:ss');
            user.password = await bcrypt.hash(req.body.password, 10);
            user = await user.save();
            return res.status(201).json(user)
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "internal server error"})
        }
    }

    async update(req: Request, res: Response, id: string | number) {
        try {
            let user = await User.findOne(id);
            if (user != undefined) {
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                // user.email = req.body.email; // Update should not change the email now
                await user.save();
                return res.status(200).json(user) 
            }else{
                return res.status(404).json({error: "Not found"})
            }
           
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "internal server error"})
        }
    }

    show(res: Response, id: string | number): void {
        User.findOne(id).then((user)=>{
            res.json(user);
        }).catch(error => {
            console.log(error);
            res.status(500).json({error: "internal server error"})
        })
    }

    async destroy(res: Response, id: string | number) {
        const user  = await User.findOne(id);
        if (user) {
            await user.remove();
            return res.status(200).json({success: "Deleted"})         
        }else{
            return res.status(404).json({error: "Not Found"});
        }
    }

    async existsEmail(email: string): Promise<boolean>{
        try {
            const  user = await User.findOne({email: email})
            return (user != undefined);     
        } catch (error) {
            console.log(console.error);
            return true;
        }
       
    }
}