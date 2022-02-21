
import { appController } from "../app";
import request from "supertest";
import { getConnection } from "typeorm";
import faker from "faker";
import { userToLogin } from "./variables"

let token: string;
let refreshToken: string;

beforeAll(async () => {
    await appController.databaseSetup();
})

describe("Expenses tests", () => {


    let expenseIdToDelete: number; // id number of the categorie to be deleted
    const expenseToDuplicate = expenseFactory() // expense to be duplicated

    it("should login a user", async () => {

        const res = await request(appController.app).post("/auth/login").send(userToLogin);
        expect(res.status).toBe(200);
        token = res.body.tokens.token;
        refreshToken = res.body.tokens.refreshToken;
    });

    it('should create a expenses', async () => {
        const res1 = await request(appController.app).post('/expenses')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken)
            .send(
                expenseToDuplicate
            );

        const res2 = await request(appController.app).post('/expenses')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken)
            .send(
                expenseFactory()
            );
        expect(res1.status).toBe(201)
        expect(res2.status).toBe(201)

        expenseIdToDelete = res2.body.id;
    });

    it('should duplicate expenses', async () => {
        const res = await request(appController.app).post('/expenses')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken)
            .send(
                expenseToDuplicate
            );
        expect(res.status).toBe(201)
    });

    it('should retrive all expenses', async () => {
        const res = await request(appController.app).get('/expenses')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken);
        expect(res.status).toBe(200);
    });

    it('should retrive a expense by id', async () => {
        const res = await request(appController.app).get('/expenses/1')
        .set('Authorization', 'Bearer ' + token)
        .set("x-refresh-token", refreshToken);
        expect(res.status).toBe(200);
    });

    it('should update a expense', async () => {
        const res = await request(appController.app).put('/expenses/1')
        .set('Authorization', 'Bearer ' + token)
        .set("x-refresh-token", refreshToken)
        .send(
            expenseFactory()
        );
        expect(res.status).toBe(200);
    });

    it('should delete a expense', async () => {
        const res = await request(appController.app).delete('/expenses/' + expenseIdToDelete)
        .set('Authorization', 'Bearer ' + token)
        .set("x-refresh-token", refreshToken);
        expect(res.status).toBe(200);
    });
});


afterAll(async () => {
    try {
        const conn = getConnection()
        if (conn.isConnected)
            await conn.close()
        // console.log("Closed");    
    } catch (error) {
        console.log(error);
    }
})

function expenseFactory() {
    const expense = {
        description: faker.random.words(3),
        amount: faker.finance.amount(),
        wallet: 1,
        category: 1
    }
    return expense;
}