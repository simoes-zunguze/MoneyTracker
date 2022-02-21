
import { appController } from "../app";
import request from "supertest";
import { getConnection } from "typeorm";
import faker from "faker";
import { WalletType } from "../app/models/Wallet";
import { User } from "../app/models/User";
import bcrypt from "bcrypt"
import { userToLogin } from "./variables"

let token: string;
let refreshToken: string;
beforeAll(async () => {
    await appController.databaseSetup();
})

describe("Wallet tests", () => {

    it("should login a user", async () => {

        const res = await request(appController.app).post("/auth/login").send(userToLogin);
        expect(res.status).toBe(200);
        token = res.body.tokens.token;
        refreshToken = res.body.tokens.refreshToken;
    });

    let idToDelete: number; // id number of the user to be deleted
    it('should create a wallets', async () => {

        const wallet1 = walletFactory()
        const wallet2 = walletFactory();

        const res1 = await request(appController.app).post('/wallets')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken)
            .send(wallet1);

        const res2 = await request(appController.app).post('/wallets')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken)
            .send(wallet2);

        expect(res1.status).toBe(201)
        expect(res2.status).toBe(201)

        idToDelete = res2.body.id;
    });

    it('should retrive all wallets', async () => {
        const res = await request(appController.app).get('/wallets')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken);
        expect(res.status).toBe(200);
    });

    it('should retrive a wallet by id', async () => {
        const res = await request(appController.app).get('/wallets/1')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken);
        expect(res.status).toBe(200);
    });

    it('should update a wallet', async () => {
        const res = await request(appController.app).put('/wallets/1')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken)

            .send(walletFactory());
        expect(res.status).toBe(200);
    });

    it('should delete a wallet', async () => {
        const res = await request(appController.app).delete('/wallets/' + idToDelete)
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken);
        expect(res.status).toBe(200);
    });
});


afterAll(async () => {
    try {
        const conn = getConnection()
        await conn.close()
    } catch (error) {
        throw error;

    }
})

function walletFactory() {

    const wallet = {
        balance: faker.finance.amount(100, 10000),
        limit: 10000,
        description: faker.random.words(4),
        type: WalletType.DEBIT,
        user: 1
    }
    return wallet;
}
