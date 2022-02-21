
import { appController } from "../app";
import request from "supertest";
import {  getConnection } from "typeorm";
import faker  from "faker";
import { User } from "../app/models/User";
import {userToLogin} from "./variables"

beforeAll( async ()=>{ 
    await appController.databaseSetup();
})


describe("User tests", () =>{

    let userIdToDelete: number; // id number of the user to be deleted
    const userToDuplicate = userFactory() // User to be duplicated
    it('should create a users', async () => {
 
        const res0 =  await request(appController.app).post( '/users').send(
            userToLogin
        );

        const res1 =  await request(appController.app).post( '/users').send(
            userToDuplicate
        );    
        
        const res2 =  await request(appController.app).post( '/users').send(
            userFactory()
        ); 
        

        expect(res0.status).toBe(201)        
        expect(res1.status).toBe(201) 
        expect(res2.status).toBe(201)        

        userIdToDelete = res2.body.id;        
    });

    it('should not duplicate users', async() => {
        const res =  await request(appController.app).post( '/users').send(
            userToDuplicate
        );
        expect(res.status).toBe(400)
    });

    it('should retrive all users', async() => {
        const res =  await request(appController.app).get( '/users');
        expect(res.status).toBe(200);
    });

    it('should retrive a user by id', async() => {
        const res =  await request(appController.app).get( '/users/1');
        expect(res.status).toBe(200);
    });

    it('should update a user', async() => {
        const res =  await request(appController.app).put( '/users/2').send(
            userFactory()
        );
        expect(res.status).toBe(200);
    });

    it('should delete a user', async() => {
        const res =  await request(appController.app).delete( '/users/'+userIdToDelete);
        expect(res.status).toBe(200);
    });

    it("should login a user", async ()=>{
        const res = await request(appController.app).post("/auth/login").send(userToLogin);

        expect(res.status).toBe(200);
    });


    it("should fail login a user", async ()=>{
        const res = await request(appController.app).post("/auth/login").send({...userToLogin, password: "Wrongpass"} );
        expect(res.status).toBe(401);
    });
});
    
    
afterAll( async ()=>{ 
    try {
        const conn =  await getConnection()
        if(conn.isConnected)
            await conn.close()
        // console.log("Closed");    
    } catch (error) {
        console.log(error);   
    }
 })

function userFactory(){
    const user ={
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }

    return user;
 }