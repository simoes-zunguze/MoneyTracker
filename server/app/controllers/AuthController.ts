import { Request, Response } from "express";
import { IController } from "./IController";
import bcrypt from "bcrypt"
import { User } from "../models/User";
import { generateTokens } from "../../providers/Auth/JWTProvider";
import { Token } from "../models/Token";

export default class AuthController implements IController {
    login(req: Request<any, any, { email: string, password: string }>, res: Response) {
        // bcrypt.hash("12345", 12).then( (hash) => {
        //     res.json(hash);
        // });

        if (req.body.email && req.body.password) {
            const email = req.body.email ;
            User.getRepository().findOne({ select:["firstName", "lastName", "email", "password", "isActive"]
            , where: {email} }).then(user => {
                if (user != undefined) {
                    console.log(req.body);

                    bcrypt.compare(req.body.password, user.password).then(function (result) {
                        console.log(user);

                        if (result) {
                            const tokens = generateTokens(user, process.env.JWT_SECRET as string, process.env.JWT_REFRESH_SECRET as string);
                            user.password="";
                            res.json({tokens, user});
                        } else {
                            res.status(401).json({ errors: { code: "001", msg: "Invalid credemtials" } });
                        }
                    }).catch( error => {
                        console.log("-------------");
                        
                        console.error(error);
                        
                    });

                } else {
                    res.status(401).json({ errors: { code: "002", msg: "Invalid credemtials" } });
                }
            }).catch(error => {
                console.log(error);
                res.status(500).json({ errors: { code: "004", msg: "Internal server error" } });
            })
        } else {
            res.status(400).json({ errors: { code: "003", msg: "Email and password are required" } });
        }
    }

    token(req: Request, res: Response) {

    }

    async logout(req: Request, res: Response) {
        try {
            const refreshToken = req.header("x-refresh-token") as string;
            const token = await Token.findOne({ token: refreshToken })
            if(token){
                await token.remove();
                return res.status(200).send();
            }else{
                return res.status(404).send();
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send();
        }
    }
}