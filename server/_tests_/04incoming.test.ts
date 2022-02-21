
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

describe("Incoming tests", () => {


    let incomingIdToDelete: number; // id number of the categorie to be deleted
    const incomingToDuplicate = incomingFactory() // incoming to be duplicated

    it("should login a user", async () => {

        const res = await request(appController.app).post("/auth/login").send(userToLogin);
        expect(res.status).toBe(200);
        token = res.body.tokens.token;
        refreshToken = res.body.tokens.refreshToken;
    });

    it('should create a incomings', async () => {
        const res1 = await request(appController.app).post('/incomings')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken)
            .send(
                incomingToDuplicate
            );

        const res2 = await request(appController.app).post('/incomings')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken)
            .send(
                incomingFactory()
            );
        expect(res1.status).toBe(201)
        expect(res2.status).toBe(201)

        incomingIdToDelete = res2.body.id;
    });

    it('should duplicate incomings', async () => {
        const res = await request(appController.app).post('/incomings')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken)
            .send(
                incomingToDuplicate
            );
        expect(res.status).toBe(201)
    });

    it('should retrive all incomings', async () => {
        const res = await request(appController.app).get('/incomings')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken);
        expect(res.status).toBe(200);
    });

    it('should retrive a incoming by id', async () => {
        const res = await request(appController.app).get('/incomings/1')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken);
        expect(res.status).toBe(200);
    });

    it('should update a incoming', async () => {
        const res = await request(appController.app).put('/incomings/1')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken)
            .send(
                incomingFactory()
            );
        expect(res.status).toBe(200);
    });

    it('should delete a incoming', async () => {
        const res = await request(appController.app).delete('/incomings/' + incomingIdToDelete)
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken);
        expect(res.status).toBe(200);
    });
});


afterAll(async () => {
    try {
        const conn = await getConnection()
        if (conn.isConnected)
            await conn.close()
        // console.log("Closed");    
    } catch (error) {
        console.log(error);
    }
})

function incomingFactory() {
    const incoming = {
        description: faker.random.words(3),
        amount: faker.finance.amount(),
        wallet: 1
    }
    return incoming;
}