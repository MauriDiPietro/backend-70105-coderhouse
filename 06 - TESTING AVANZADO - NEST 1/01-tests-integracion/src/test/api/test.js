import mongoose from "mongoose";
import { fakerES as faker } from "@faker-js/faker";
import test, { before, describe } from "node:test";
import assert from "node:assert";
import axios from "axios";

const mockNew = () => {
  return {
    title: faker.lorem.lines(1),
    body: faker.lorem.lines(1),
    author: faker.person.fullName(),
    image: faker.image.url(),
  };
};

const apiURL = "http://localhost:8080/news";

describe("/news", () => {
  // before(() => {
  //   mongoose.connection.collections["news"].drop();
  // });

  test("[POST]", async () => {
    const fakeNew = mockNew();
    // console.log(fakeNew);

    const responseAPI = await axios.post(apiURL, fakeNew);
    const response = responseAPI.data;
    const titleResponse = response.title;
    const bodyResponse = response.body;
    const authorResponse = response.author;
    const imageResponse = response.image;

    assert.ok(response, "_id");
    assert.equal(titleResponse, fakeNew.title);
    assert.equal(bodyResponse, fakeNew.body);
    assert.equal(authorResponse, fakeNew.author);
    assert.equal(imageResponse, fakeNew.image);
    assert.equal(responseAPI.status, 200);
  });

  test("[GET]", async () => {
    const response = await axios.get(apiURL);
    assert.equal(response.status, 200);
    assert.strictEqual(Array.isArray(response.data), true);
    //   assert.equal(response.data.length, 1);
    const dateResponse = response.data[0].date;
    const actualYear = new Date().getFullYear();
    assert.equal(dateResponse.includes(actualYear), true);
  });
});

describe("/news/:id", () => {
  test("[GET]", async () => {
    const fakeNew = mockNew();
    const responseAPI = await axios.post(apiURL, fakeNew);
    const response = responseAPI.data;
    const titleResponse = response.title;
    const bodyResponse = response.body;
    const authorResponse = response.author;
    const imageResponse = response.image;

    assert.ok(response, "_id");
    assert.equal(titleResponse, fakeNew.title);
    assert.equal(bodyResponse, fakeNew.body);
    assert.equal(authorResponse, fakeNew.author);
    assert.equal(imageResponse, fakeNew.image);
    assert.equal(responseAPI.status, 200);

    const responseGet = await axios.get(`${apiURL}/${response._id}`);
    // console.log(responseGet);
    
    assert.equal(responseGet.status, 200);
    assert.equal(responseGet.data.title, response.title);
    assert.equal(responseGet.data.body, response.body);
    assert.equal(responseGet.data.author, response.author);
    assert.equal(responseGet.data.image, response.image);

    const idFake = "67546544c49af1ad07095268";
    const responseGetByIdFail = await axios.get(`${apiURL}/${idFake}`);
    //{msg: `No se encontró el id ${id} en la base de datos.`}
    assert.equal(responseGetByIdFail.status, 404);
    assert.equal(
      responseGetByIdFail.data.msg,
      `No se encontró el id ${idFake} en la base de datos.`
    );
  });


});
