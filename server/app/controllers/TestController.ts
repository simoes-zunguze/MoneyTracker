import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { User } from "../models/User";
import faker from "faker";
import bcrypt from "bcrypt"

export default class TestController{
    index(req: Request, res:Response){
        res.send("Hello World")
        const user = new User();
        user.firstName = faker.name.firstName();
        user.lastName =  faker.name.lastName()
        user.email = faker.internet.email();
        user.isActive = true;
        user.password ="334";        
        bcrypt.hash(faker.internet.password(), 10, function(err, hash) {
            user.password = hash;
            getRepository(User).save(user)
        });
    }
}