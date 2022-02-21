import { Request } from "express";
import { User } from "../app/models/User";

export default class AuthRequest extends Request{
    public user: User;
}