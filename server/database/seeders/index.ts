import { exit } from "process";
import { createConnection } from "typeorm";
import { User } from "../../app/models/User";
import { billFactory, categoryFactory, expenseFactory, walletFactory, userFactory, incomingFactory } from "../factories"
import bcrypt from "bcrypt"

const init = async () => {
    await createConnection();
    
    let user = new User();
    user.firstName = "Jhon";
    user.lastName = "Doe";
    user.password = await bcrypt.hash("123456", 12);
    user.email = "user1@mail";
    user = await user.save();

    await userFactory(2);
    await categoryFactory(3);
    await walletFactory(2);
    // await billFactory(4);
    await expenseFactory(6);
    await incomingFactory(4);
    exit(0)
}

init();