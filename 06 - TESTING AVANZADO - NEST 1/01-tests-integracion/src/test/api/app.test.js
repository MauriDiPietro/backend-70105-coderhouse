//npm i -D supertest jest
//supertest --> request --> peticiones a la api
//jest --> runner --> aserciones / comparaciones

import app from "../../server.js";
import request from "supertest";
import mongoose from "mongoose";
import { fakerES as faker } from "@faker-js/faker";

const mockNew = () => {
  return {
    title: faker.lorem.lines(1),
    body: faker.lorem.lines({ min: 1, max: 5 }),
    author: faker.person.fullName(),
    image: faker.image.url(),
  };
};

describe("/news", () => {
  beforeAll(async () => {
    await mongoose.connection.collections["news"].drop();
  });

  test("[POST]", async () => {
    const fakeNew = mockNew();
    const response = await request(app).post("/news").send(fakeNew);
    // console.log(response.body);
    const id = response.body._id;
    const titleResponse = response.body.title;
    const bodyResponse = response.body.body;
    const authorResponse = response.body.author;
    const imageResponse = response.body.image;

    expect(id).toBeDefined();
    expect(response.body).toHaveProperty("_id");
    expect(titleResponse).toBe(fakeNew.title);
    expect(bodyResponse).toBe(fakeNew.body);
    expect(authorResponse).toBe(fakeNew.author);
    expect(imageResponse).toBe(fakeNew.image);
    expect(response.statusCode).toBe(200);
  });

  test("[GET]", async () => {
    const response = await request(app).get("/news");
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(1);
    const dateResponse = response.body[0].date;
    const actualYear = new Date().getFullYear();
    expect(dateResponse).toEqual(expect.stringContaining(`${actualYear}`));
  });
});

describe("/news/:id", () => {
  test("[GET]", async () => {
    const fakeNew = mockNew();
    const response = await request(app).post("/news").send(fakeNew);
    const id = response.body._id;
    const titleResponse = response.body.title;
    const bodyResponse = response.body.body;
    const authorResponse = response.body.author;
    const imageResponse = response.body.image;

    expect(id).toBeDefined();
    expect(response.body).toHaveProperty("_id");
    expect(titleResponse).toBe(fakeNew.title);
    expect(bodyResponse).toBe(fakeNew.body);
    expect(authorResponse).toBe(fakeNew.author);
    expect(imageResponse).toBe(fakeNew.image);
    expect(response.statusCode).toBe(200);

    const responseGet = await request(app).get(`/news/${response.body._id}`);
    expect(responseGet.statusCode).toBe(200);
    expect(responseGet.body.title).toEqual(response.body.title);
    expect(responseGet.body.body).toEqual(response.body.body);
    expect(responseGet.body.author).toEqual(response.body.author);
    expect(responseGet.body.image).toEqual(response.body.image);
    
    const idFake = '67546544c49af1ad07095268';
    const responseGetByIdFail = await request(app).get(`/news/${idFake}`);
    //{msg: `No se encontró el id ${id} en la base de datos.`}
    expect(responseGetByIdFail.statusCode).toBe(404);
    expect(responseGetByIdFail.body.msg).toEqual(`No se encontró el id ${idFake} en la base de datos.`)
  });

  test("[UPDATE]", async () => {
    const fakeNew = mockNew();
    const response = await request(app).post("/news").send(fakeNew);
    const id = response.body._id;
    const titleResponse = response.body.title;
    const bodyResponse = response.body.body;
    const authorResponse = response.body.author;
    const imageResponse = response.body.image;

    expect(id).toBeDefined();
    expect(response.body).toHaveProperty("_id");
    expect(titleResponse).toBe(fakeNew.title);
    expect(bodyResponse).toBe(fakeNew.body);
    expect(authorResponse).toBe(fakeNew.author);
    expect(imageResponse).toBe(fakeNew.image);
    expect(response.statusCode).toBe(200);

    const fakeNewUpdate = mockNew();

    const responsePut = await request(app).put(`/news/${id}`).send(fakeNewUpdate);
    expect(responsePut.statusCode).toBe(200);
    expect(responsePut.body.title).toEqual(fakeNewUpdate.title);
    expect(responsePut.body.body).toEqual(fakeNewUpdate.body);
    expect(responsePut.body.author).toEqual(fakeNewUpdate.author);
    expect(responsePut.body.image).toEqual(fakeNewUpdate.image);
    expect(responsePut.body._id).toEqual(id);
  });

  test("[DELETE]", async () => {
    const fakeNew = mockNew();
    const response = await request(app).post("/news").send(fakeNew);
    const id = response.body._id;
    const titleResponse = response.body.title;
    const bodyResponse = response.body.body;
    const authorResponse = response.body.author;
    const imageResponse = response.body.image;

    expect(id).toBeDefined();
    expect(response.body).toHaveProperty("_id");
    expect(titleResponse).toBe(fakeNew.title);
    expect(bodyResponse).toBe(fakeNew.body);
    expect(authorResponse).toBe(fakeNew.author);
    expect(imageResponse).toBe(fakeNew.image);
    expect(response.statusCode).toBe(200);

    const responseGet = await request(app).delete(`/news/${id}`);
    expect(responseGet.statusCode).toBe(200);
    expect(responseGet.body.title).toEqual(response.body.title);
    expect(responseGet.body.body).toEqual(response.body.body);
    expect(responseGet.body.author).toEqual(response.body.author);
    expect(responseGet.body.image).toEqual(response.body.image);
    
    const responseGetByIdFail = await request(app).get(`/news/${id}`);
    //{msg: `No se encontró el id ${id} en la base de datos.`}
    expect(responseGetByIdFail.statusCode).toBe(404);
    expect(responseGetByIdFail.body.msg).toEqual(`No se encontró el id ${id} en la base de datos.`)
  });
});
