import { createConnection } from "typeorm";
import { User } from "../../app/models/User";
import faker from "faker";
import { Wallet, WalletType } from "../../app/models/Wallet";
import { Category } from "../../app/models/Category";
import { Incoming } from "../../app/models/Incoming";
import { Expense } from "../../app/models/Expense";
import { Bill } from "../../app/models/Bill";
import bcrypt from "bcrypt"
/*NOTE: cerate a connection before call the factory methods*/

async function userFactory(quant = 1) {

    for (let i = 0; i < quant; i++) {
        let user = new User();
        user.firstName = faker.name.findName();
        user.lastName = faker.name.lastName();
        user.password = await bcrypt.hash("123456", 12);
        user.email = faker.internet.email();
    
        user = await user.save();
    }
}

async function walletFactory(quant = 1, userId = 1) {

    for (let i = 0; i < quant; i++) {
        let wallet = new Wallet();
        wallet.balance = Number.parseFloat(faker.finance.amount(10, 10000));
        wallet.description = faker.random.words();
        wallet.limit = Number.parseFloat(faker.finance.amount(10, 10000));
        wallet.type = WalletType.DEBIT;
        wallet.user = await User.findOne(userId) as User;
        wallet = await wallet.save();
    }
}

async function categoryFactory(quant = 1) {

    for (let i = 0; i < quant; i++) {
        let category = new Category();
        category.name = faker.random.word();
        category.description = faker.random.words();
        category.user = await User.findOne(1) as User;

        category.limit = 3000;
        category = await category.save();
    }
}


async function incomingFactory(quant = 1, walletId = 1) {

    for (let i = 0; i < quant; i++) {
        let incoming = new Incoming();
        incoming.description = faker.random.words(3);
        incoming.amount = Number.parseFloat(faker.finance.amount(10, 10000));
        incoming.wallet = await Wallet.findOne(walletId) as Wallet;
        incoming = await incoming.save();
    }
}

async function expenseFactory(quant = 1, walletId = 1, categoryId = 1) {

    for (let i = 0; i < quant; i++) {
        let expense = new Expense();
        expense.description = faker.random.words(3);
        expense.amount = Number.parseFloat(faker.finance.amount(10, 10000));
        expense.wallet = await Wallet.findOne(walletId) as Wallet;
        expense.category = await Category.findOne(categoryId) as Category;
        expense = await expense.save();
    }
}

async function billFactory(quant = 1, userId = 1, categoryId = 1) {

    for (let i = 0; i < quant; i++) {
        let bill = new Bill();
        bill.description = faker.random.words(3);
        bill.amount = Number.parseFloat(faker.finance.amount(10, 10000));
        bill.user = await User.findOne(userId) as User;
        bill.category = await Category.findOne(categoryId) as Category;
        bill = await bill.save();
    }
}

export {
    expenseFactory,
    billFactory,
    incomingFactory,
    walletFactory,
    userFactory,
    categoryFactory
}