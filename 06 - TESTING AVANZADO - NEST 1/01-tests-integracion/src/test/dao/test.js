import { daoNews } from "../../persistence/DAOS/mongo/news.mongo.dao.js";
import { fakerES as faker } from "@faker-js/faker";
import test, { before, after, describe } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import { logger } from "../../logs/news.logs.js";

const newMock = () => {
  return {
    title: faker.lorem.lines(1),
    body: faker.lorem.lines({ min: 1, max: 5 }),
    author: faker.person.fullName(),
    image: faker.image.url(),
  };
};

describe("Tests unitarios de Dao News", () => {
  before(() => {
    daoNews.init();
    mongoose.connection.collections["news"].drop();
    logger.info("se limpió la colección");
  });

  after(() => {
    logger.info("finalizaron las pruebas");
  });

  test("Debería retornar todas las noticias de la colección", async () => {
    const response = await daoNews.getAllNews();
    assert.equal(Array.isArray(response), true);
    assert.equal(response.length, 0);
  });

  test("Debería agregar una noticia", async () => {
    const doc = newMock();
    logger.info(doc);
    const response = await daoNews.createNew(doc);
    const news = await daoNews.getAllNews();
    assert.ok(response._id);
    // assert.fail(response.asdasd)
    assert.equal(response.title, doc.title);
    assert.equal(news.length, 1);
  });
});
