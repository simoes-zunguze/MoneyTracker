
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

describe("Category tests", () => {


    let categoryIdToDelete: number; // id number of the categorie to be deleted
    const categoryToDuplicate = categoryFactory() // category to be duplicated

    it("should login a user", async () => {

        const res = await request(appController.app).post("/auth/login").send(userToLogin);
        expect(res.status).toBe(200);
        token = res.body.tokens.token;
        refreshToken = res.body.tokens.refreshToken;
    });

    it('should create a categories', async () => {
        const res1 = await request(appController.app).post('/categories')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken)
            .send(categoryToDuplicate);

        const res2 = await request(appController.app).post('/categories')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken)
            .send(categoryFactory());
        expect(res1.status).toBe(201)
        expect(res2.status).toBe(201)

        categoryIdToDelete = res2.body.id;
    });

    it('should not duplicate categories', async () => {
        const res = await request(appController.app).post('/categories')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken)
            .send(categoryToDuplicate);
        expect(res.status).toBe(400)
    });

    it('should retrive all categories', async () => {
        const res = await request(appController.app).get('/categories')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken);
        expect(res.status).toBe(200);
    });

    it('should retrive a category by id', async () => {
        const res = await request(appController.app).get('/categories/1')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken);
        expect(res.status).toBe(200);
    });

    it('should update a category', async () => {
        const res = await request(appController.app).put('/categories/1')
            .set('Authorization', 'Bearer ' + token)
            .set("x-refresh-token", refreshToken)
            .send(categoryFactory());
        expect(res.status).toBe(200);
    });

    it('should delete a category', async () => {
        const res = await request(appController.app).delete('/categories/' + categoryIdToDelete)
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

function categoryFactory() {
    const category = {
        name: faker.random.word(),
        description: faker.random.words(3),
        limit: faker.finance.amount(0, 50000),
        password: faker.internet.password()
    }

    return category;
}