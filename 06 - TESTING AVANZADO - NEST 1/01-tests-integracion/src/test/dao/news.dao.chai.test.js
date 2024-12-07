import { daoNews } from "../../persistence/DAOS/mongo/news.mongo.dao.js";
import { expect } from 'chai';
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
        expect(Array.isArray(response)).to.be.equal(true);
        expect(response.length === 0).to.be.equal(true);
        expect(response).to.have.length(0);
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
        expect(response).to.have.property('_id');
        expect(response.title).to.be.equal(doc.title);
        expect(news).to.have.length(1);
    })
})