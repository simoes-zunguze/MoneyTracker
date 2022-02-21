import "reflect-metadata";

import {appController} from "./app"

appController.databaseSetup();

appController.app.listen( 3000, ()=>{
    console.log("Server started at PORT 3000...");
})