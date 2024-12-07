import { daoNews } from "../../persistence/DAOS/mongo/news.mongo.dao.js";
// import { expect } from 'chai';
import assert from 'node:assert';
import mongoose from 'mongoose';
import { logger } from "../../logs/news.logs.js";

describe('Tests unitarios de Dao News', ()=>{
    
    before(()=>{
        daoNews.init();
        mongoose.connection.collections['news'].drop();
        logger.info('se limpió la colección')
    });

    after(()=>{
        logger.info('finalizaron las pruebas')
    });

    it('Debería retornar todas las noticias de la colección', async()=>{
        const response = await daoNews.getAllNews();
        assert.equal(Array.isArray(response), true);
        assert.equal(response.length, 0);
    });

    it('Debería agregar una noticia', async()=>{
        const doc = {
            title: 'Llueve en todo el país',
            body: '........',
            author: 'Juan Dominguez',
            image: '......'
        }

        const response = await daoNews.createNew(doc);
        const news = await daoNews.getAllNews();
        assert.ok(response._id);
        // assert.fail(response.asdasd)
        assert.equal(response.title, doc.title);
        assert.equal(news.length, 1);
    })
})