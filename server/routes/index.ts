import { Application } from "express";
import categoryRoute from "./categoryRoute";
import incomingRoute from "./incomingRoute";
import userRoute from "./userRoute";
import walletRoute from "./walletRoute";
import expenseRoute from "./expenseRoute";
import billRoute from "./billRoute";
import authRoute from "./authRoute";
import auth from "../app/middlewares/authMiddleware";
import userProfileRoute from "./userProfileRoute";
import dashboardRoute from "./dashboardRoute";
export default  function routes(app: Application){
    if (process.env.NODE_ENV !== "PROD" ) {
        app.use("/users", userRoute);
    }
    app.use("/dashboard", auth, dashboardRoute);
    app.use("/wallets", auth, walletRoute);
    app.use("/categories", auth, categoryRoute);
    app.use("/incomings", auth, incomingRoute);
    app.use("/expenses",auth, expenseRoute);
    app.use("/bills", auth, billRoute);
    app.use("/profile", auth, userProfileRoute);

    app.use("/auth", authRoute);

    app.use("/", (req, res)=>{
        res.send();
    });

}