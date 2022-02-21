import { Connection, ConnectionOptions, createConnection, getConnection } from "typeorm";
import configProdution from "../ormconfig-prod.js";
import configTest from "../ormconfig-test";


export default async function connectDatabase(){
    let connection : Connection | undefined = undefined;
    
    try {
        if(process.env.NODE_ENV === "PROD"){
            // Production Connetion
              connection =  await createConnection(configProdution as ConnectionOptions)
              console.log("Connected to database...(PROD)");
            return connection;
        }else if(process.env.NODE_ENV === "TEST"){
            // Production Test
            connection =  await createConnection(configTest as ConnectionOptions)
            console.log("Connected to database...(TEST)");
          return connection;
        }else{
            // Development Connetion 
            connection = await createConnection()
            console.log("Connected to database...(DEV)");
            return connection;
        }
    } catch (error) {
        throw error;
    }   
} 
