import { Router } from "express";

import AuthController from "../app/controllers/AuthController";
import auth from "../app/middlewares/authMiddleware";

const authController = new AuthController();
export default 

Router().post("/login", (req, res) => {
    authController.login(req, res);
})
// .get("/token", (req, res) => {
//     authController.token(req, res);
// })
.get("/logout", auth, (req, res) => {
    authController.logout(req, res);
})

.get("/profile", auth, (req, res) => {
    res.send(res.locals.user)
})
