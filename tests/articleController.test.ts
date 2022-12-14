import {expect} from 'chai';
import 'mocha';
import ArticleController from '../src/controllers/article';
import mocks from 'node-mocks-http';
import ArticleService from '../src/services/article';
import sinon from 'sinon';
import IArticle from '../src/models/interfaces/IArticle';

describe('ArticleController', () => {
        
    afterEach(() => {
        sinon.restore();
    });    
    
    it('GetArticles - WithoutArticles', async function() {
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        sinon.stub(ArticleService, 'fetch').resolves([]);
        const spySend = sinon.spy(res, 'json');

        await ArticleController.fetch(req, res, next);

        expect(spySend.calledWith([])).to.be.true;
    
    });
    
    it('GetArticles - One Article', async function() {
        const article = <IArticle>{
            author: 'author',
            body: 'body',
            title: 'title'
        };
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        sinon.stub(ArticleService, 'fetch').resolves([<any>article]);
        const spySend = sinon.spy(res, 'json');
        
        await ArticleController.fetch(req, res, next);
        
        const body = res._getJSONData();
        expect(spySend.calledWith([article])).to.be.true;
        expect(body.length).to.be.equals(1);
        
    });

    it('GetArticleById - bad request', async function() {
        
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        req._setParameter('id','sdf')
        ArticleController.find(req, res, next);
        
        expect(res.statusCode).to.equal(400);
    });
    
    it('GetArticleById - not found', async function() {
        
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        req._setParameter('id','123165797d3272395398efe7')
        
        sinon.stub(ArticleService, 'find').resolves(null);        
        const spySend = sinon.spy(res, 'json');
    
        await ArticleController.find(req, res, next);
    
        expect(spySend.callCount).to.be.equals(1);
        expect(res.statusCode).to.equal(404);    
    });
    
    it('GetArticleById - find one', async function() {
        
        const article = <IArticle>{
            _id: '62f165797d3272395398efe7',
            author: 'author',
            body: 'body',
            title: 'title'
        };
    
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        req._setParameter('id','62f165797d3272395398efe7')
        
        sinon.stub(ArticleService, 'find').resolves(<any>article);        
        const spySend = sinon.spy(res, 'json');
    
        await ArticleController.find(req, res, next);
    
        const body = res._getJSONData();
        expect(spySend.callCount).to.be.equals(1);
        expect(res.statusCode).to.equal(200);
        expect(body._id).to.equal('62f165797d3272395398efe7');
    
    });
    
    it('UpdateArticle - OK', async function() {
        
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        const article = <IArticle>{
            _id: '62f165797d3272395398efe7',
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','62f165797d3272395398efe7');
        req._addBody("article", article);
        const spyJson = sinon.spy(res, 'json');
        sinon.stub(ArticleService, 'update').resolves(<any>article);
    
        await ArticleController.update(req, res, next);
    
        const body = res._getJSONData();
        expect(spyJson.calledWith(article)).to.be.true;
        expect(JSON.stringify(body)).to.be.equals(JSON.stringify(article));
    
    });

    it('UpdateArticle - bad request', async function() {
        
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        const article = <IArticle>{
            _id: '62f165797d3272395398efe7',
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','qwewe');
        req._addBody("article", article);
        sinon.stub(ArticleService, 'update').resolves(<any>article);
    
        await ArticleController.update(req, res, next);
        expect(res.statusCode).to.equal(400);
    });

    it('DeleteArticle - OK', async function() {
        
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        const article = <IArticle>{
            _id: '62f165797d3272395398efe7',
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','62f165797d3272395398efe7');
        req._addBody("article", article);
        const spyJson = sinon.spy(res, 'json');
        sinon.stub(ArticleService, 'delete').resolves(<any>article);
    
        await ArticleController.delete(req, res, next);
    
        const body = res._getJSONData();
        expect(spyJson.calledWith(article)).to.be.true;
        expect(JSON.stringify(body)).to.be.equals(JSON.stringify(article));
    
    });

    it('DeleteArticle - bad request', async function() {
        
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        const article = <IArticle>{
            _id: '62f165797d3272395398efe7',
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','qwewe');
        req._addBody("article", article);
        sinon.stub(ArticleService, 'delete').resolves(<any>article);
    
        await ArticleController.delete(req, res, next);

        expect(res.statusCode).to.equal(400);
    });

    it('CreateArticle - OK', async function() {
        
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        const article = <IArticle>{
            _id: '62f165797d3272395398efe7',
            author: 'author',
            body: 'body',
            title: 'title'
        };
        
        req._setParameter('id','62f165797d3272395398efe7');
        req._addBody("article", article);
        const spyJson = sinon.spy(res, 'json');
        sinon.stub(ArticleService, 'create').resolves(<any>article);
    
        await ArticleController.create(req, res, next);
    
        
        const body = res._getJSONData();

        expect(spyJson.calledWith(article)).to.be.true;
        expect(res.statusCode).to.equal(201);
        expect(JSON.stringify(body)).to.be.equals(JSON.stringify(article));
    
    });
});