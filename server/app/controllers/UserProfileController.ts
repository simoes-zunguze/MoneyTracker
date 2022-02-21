import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export class UserProfileController{
    async edit(req: Request, res: Response){
        try {
            let user:User = await User.findOne(res.locals.user.id) as User;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;            
            if (this.validatePassword(req)) {
                if (req.body?.password) {
                    user.password = await bcrypt.hash(req.body.password, 12)
                    await user.save();
                    return res.send(user);
                }else{ 
                    await user.save();
                    return res.send(user);
                }
            }else{
                res.status(400).send({password: "Password doesnt match"});
            }

        } catch (error) {
                console.log(error);
                
        }
       
    }

    validatePassword(req: Request){
        if(req.body?.password || req.body?.confirmPassword){
            if (req.body.password == req.body.confirmPassword) {
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }
}