import { describe, test } from 'node:test';
import assert from 'node:assert';
import { fakerES as faker } from '@faker-js/faker';

const fakeUser = () =>{
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ max: 90 }),
        password: faker.string.hexadecimal()
    }
};

const apiURL = 'http://localhost:8080/users';

describe('TESTS API USERS', ()=>{
    let userRegister = null;
    let cookieToken = null;

    test('[/register]', async()=>{
        const body = fakeUser();

        userRegister = {
            email: body.email,
            password: body.password
        };

        const response = await fetch(`${apiURL}/register`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const responseAPI = await response.json();
        console.log(responseAPI);
        // PRUEBAS DE REGISTRO........
        assert.rejects()
    });

    test('[/login]', async()=>{
        const response = await fetch(`${apiURL}/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userRegister),
            credentials: 'include'
        });

        const responseAPI = await response.json();
        assert.ok(responseAPI, 'token')
        const setCookieHeader = response.headers.get('Set-Cookie');
                                                //.get('Authorization')
        /*
        token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiUGVkcm8iLCJsYXN0X25
        hbWUiOiJHb21leiIsImVtYWlsIjoicGdvbWV6MjBAbWFpbC5jb20iLCJhZ2UiOjQwLCJyb2xlIjoidXNlciIsImlhdCI6MTczMzU5
        MzQ0NiwiZXhwIjoxNzMzNTk0NjQ2fQ.V-iaoBKkh96bYPPnWVXx63wSsX2OPKPXTsTGPbHxja4; Path=/; HttpOnly
        */
       assert.ok(setCookieHeader, 'el header set-cookie deberia estar en la respuesta');
       assert.ok(setCookieHeader.includes('token='));
       cookieToken = setCookieHeader.split(';')[0];
       console.log(cookieToken);
    });

    test('[/private-cookies]', async()=>{
        const response = await fetch(`${apiURL}/private-cookies`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieToken
                //Authorization:
            },
            credentials: 'include'
        });
        const responseAPI = await response.json();
        console.log(responseAPI);
        assert.equal(responseAPI.user.email, userRegister.email);
    })
})