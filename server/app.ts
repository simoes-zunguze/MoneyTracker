import "reflect-metadata";
import express  from "express";
import morgan from "morgan";
import routes from "./routes";
import connectDatabase from "./config/database";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";

require("dotenv").config();

class AppController{
    app: any;
    constructor(){
        this.app = express();
        this.middlewaresSetup();
        this.routesSetup();
    }

    async databaseSetup(){
        return  await connectDatabase();
    }

    middlewaresSetup(){
        this.app.use(cors({exposedHeaders: ["x-token"]}));
        this.app.use(express.json({ limit: "1kb" }))
        this.app.use(express.urlencoded({extended:true, limit: "1kb"}))
        this.app.use(hpp());
        this.app.use(helmet());

        if (process.env.NODE_ENV != "TEST") {
            this.app.use(morgan("combined"));                    
        }
    }

    async routesSetup(){
        routes(this.app);
    }

}

const  appController = new AppController();

export {appController};

