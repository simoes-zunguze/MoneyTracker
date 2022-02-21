import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { generateToken, verifyToken } from "../../providers/Auth/JWTProvider";
import { Token } from "../models/Token";
import { User } from "../models/User";

export default async function auth(req: Request, res: Response, next: NextFunction) {
    // res.locals.user = await User.findOne(1);

    if (req.header("authorization") && req.header("x-refresh-token")) {

        const token = req.header("authorization")?.split(" ")[1] as string;
        const refreshToken = req.header("x-refresh-token") as string;

        // console.log(refreshToken);
        // console.log(token);
        
        const tokenStecret = process.env.JWT_SECRET as string;
        const refreshTokenStecret = process.env.JWT_REFRESH_SECRET as string;


        const decodedToken = verifyToken(token, tokenStecret);

        //If the token is valid continuos the exexution(next())
        if (decodedToken) {
            
            const currentUser = await User.findOne<User>({ email: (decodedToken as JwtPayload).email }) as User;
            res.locals.user = currentUser;
            return next();
        }else{

            // If refreshToken exists in the databse
            const tokenObject = await Token.findOne({ token: refreshToken });
            const decodedRefreshToken = verifyToken(refreshToken, refreshTokenStecret);
    
            //if decodeded token is valid and exists in the database
            if (decodedRefreshToken && tokenObject){
                try {
                    const currentUser = await User.findOne<User>({ email: (decodedRefreshToken as JwtPayload).email }) as User;
                    res.locals.user = currentUser;
                    const newToken = generateToken(currentUser, tokenStecret)
                    res.setHeader("x-token", newToken)
                    return next();
                } catch (error) {
                    console.error(error);
                    return res.status(501).send();
                }
            }else{
                return res.status(401).json({ errors: { code: "002" } });
            }
        } 
    } else {
        return res.status(401).json({ errors: { code: "001" } });
    }
}
