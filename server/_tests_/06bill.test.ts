
import { appController } from "../app";
import request from "supertest";
import {  getConnection } from "typeorm";
import faker  from "faker";
import {userToLogin} from "./variables"

let token : string;
let refreshToken : string;

beforeAll( async ()=>{ 
    await appController.databaseSetup();
})

describe("Incoming tests", () =>{


    let billIdToDelete: number; // id number of the categorie to be deleted
    const billToDuplicate = billFactory() // bill to be duplicated
    
    it("should login a user", async ()=>{
        
        const res = await request(appController.app).post("/auth/login").send( userToLogin );
        expect(res.status).toBe(200);
        token = res.body.tokens.token;
        refreshToken = res.body.tokens.refreshToken;
    });

    it('should create a bills', async () => {
        const res1 =  await request(appController.app).post( '/bills')
        .set('Authorization', 'Bearer ' + token)
        .set("x-refresh-token", refreshToken)
        .send(
            billToDuplicate
        );    
        
        const res2 =  await request(appController.app).post( '/bills')
        .set('Authorization', 'Bearer ' + token)
        .set("x-refresh-token", refreshToken)
        .send(
            billFactory()
        );    
        expect(res1.status).toBe(201) 
        expect(res2.status).toBe(201)        
       
        billIdToDelete = res2.body.id;        
    });

    it('should duplicate bills', async() => {
        const res =  await request(appController.app).post( '/bills')
        .set('Authorization', 'Bearer ' + token)
        .set("x-refresh-token", refreshToken)
        .send(
            billToDuplicate
        );
        expect(res.status).toBe(201)
    });

    it('should retrive all bills', async() => {
        const res =  await request(appController.app).get( '/bills')
        .set('Authorization', 'Bearer ' + token)
        .set("x-refresh-token", refreshToken);
        expect(res.status).toBe(200);
    });

    it('should retrive a bill by id', async() => {
        const res =  await request(appController.app).get( '/bills/1')
        .set('Authorization', 'Bearer ' + token)
        .set("x-refresh-token", refreshToken);
        expect(res.status).toBe(200);
    });

    it('should update a bill', async() => {
        const res =  await request(appController.app).put( '/bills/1')
        .set('Authorization', 'Bearer ' + token)
        .set("x-refresh-token", refreshToken)
        .send(
            billFactory()
        );
        expect(res.status).toBe(200);
    });

    it('should delete a bill', async() => {
        const res =  await request(appController.app).delete( '/bills/'+billIdToDelete)
        .set('Authorization', 'Bearer ' + token)
        .set("x-refresh-token", refreshToken);
        expect(res.status).toBe(200);
    });
});
    
    
afterAll( async ()=>{ 
    try {
        const conn =  getConnection()
        if(conn.isConnected)
            await conn.close()
        // console.log("Closed");    
    } catch (error) {
        console.log(error);   
    }
 })

function billFactory(){
    const bill ={
        description: faker.random.words(3),
        amount: faker.finance.amount(),
        user: 1,
        category: 1
    }
    return bill;
}