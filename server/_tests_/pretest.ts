import { exit } from "process";
import { ConnectionOptions, createConnection } from "typeorm";
import {getManager} from "typeorm";
import testConfig from "../ormconfig-test";

async function resetDatabase(){

    const conn  =  await createConnection(testConfig as ConnectionOptions)

    const f =  await getManager().query("Delete from bill");
    await getManager().query("alter table bill AUTO_INCREMENT = 1");

    const e =  await getManager().query("Delete from expense");
    await getManager().query("alter table expense AUTO_INCREMENT = 1");

    const d =  await getManager().query("Delete from incoming");
    await getManager().query("alter table incoming AUTO_INCREMENT = 1");

    const a =  await getManager().query("Delete from category");
    await getManager().query("alter table category AUTO_INCREMENT = 1");

    const b =  await getManager().query("Delete from wallet");
    await getManager().query("alter table wallet AUTO_INCREMENT = 1");

    const c =  await getManager().query("Delete from user");
    await getManager().query("alter table user AUTO_INCREMENT = 1");

    return 1;
};

resetDatabase().then(() =>{
    exit()
})
