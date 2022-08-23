import {expect} from 'chai';
import 'mocha';
import CommentController from '../src/controllers/comment';
import mocks from 'node-mocks-http';
import CommentService from '../src/services/comment';
import sinon from 'sinon';
import IComment from '../src/models/interfaces/IComment';
import mongoose from 'mongoose';

describe('CommentController', () => {
        
    afterEach(() => {
        sinon.restore();
    });    
    
    it('GetComment - Of non existing article', async function() {
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        req._setParameter('article','123165797d3272395398efe7')
        sinon.stub(CommentService, 'findByArticleId').resolves([]);
        const spySend = sinon.spy(res, 'json');

        await CommentController.fetch(req, res, next);

        expect(res.statusCode).to.equal(404);
    
    });
    
    it('GetComment - Of existing article', async function() {
        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new mongoose.Types.ObjectId('123165797d3272395398efe7')
        };
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        req._setParameter('article','123165797d3272395398efe7')
        sinon.stub(CommentService, 'findByArticleId').resolves([<any>comment]);
        const spySend = sinon.spy(res, 'json');
        
        await CommentController.fetch(req, res, next);
        
        const body = res._getJSONData();
        expect(spySend.calledWith([comment])).to.be.true;
        expect(body.length).to.be.equals(1);
        
    });

    it('GetComment - bad request', async function() {
        
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        req._setParameter('article','sdf')
        CommentController.find(req, res, next);
        
        expect(res.statusCode).to.equal(400);
    });
    
    it('GetComment - not found', async function() {
        
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        req._setParameter('id','123165797d3272395398efe7')
        
        sinon.stub(CommentService, 'find').resolves(null);        
        const spySend = sinon.spy(res, 'json');
    
        await CommentController.find(req, res, next);
    
        expect(spySend.callCount).to.be.equals(1);
        expect(res.statusCode).to.equal(404);    
    });
    
    it('UpdateComment - OK', async function() {
        
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new mongoose.Types.ObjectId('123165797d32723953989999')
        };
        
        req._setParameter('id','123165797d32723953989999');
        req._addBody("comment", comment);
        sinon.stub(CommentService, 'update').resolves(<any>comment);
        const spyJson = sinon.spy(res, 'json');
        
        await CommentController.update(req, res, next);
        
        const body = res._getJSONData();

        expect(spyJson.calledWith(comment)).to.be.true;
        expect(JSON.stringify(body)).to.be.equals(JSON.stringify(comment));
    
    });

    it('UpdateComment - bad request', async function() {
        
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new mongoose.Types.ObjectId('123165797d32723953989999')
        };
        
        req._setParameter('id','qwewe');
        req._addBody("comment", comment);
        sinon.stub(CommentService, 'update').resolves(<any>comment);
        
        await CommentController.update(req, res, next);
        
        expect(res.statusCode).to.equal(400);
    });

    it('DeleteComment - OK', async function() {
        
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new mongoose.Types.ObjectId('123165797d32723953989999')
        };
        
        req._setParameter('id','123165797d32723953989999');
        req._addBody("comment", comment);
        sinon.stub(CommentService, 'delete').resolves(<any>comment);
        const spyJson = sinon.spy(res, 'json');
        
        await CommentController.delete(req, res, next);
        
        const body = res._getJSONData();

        expect(spyJson.calledWith(comment)).to.be.true;
        expect(JSON.stringify(body)).to.be.equals(JSON.stringify(comment));
    
    });

    it('DeleteComment - bad request', async function() {
        
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new mongoose.Types.ObjectId('123165797d32723953989999')
        };
        
        req._setParameter('id','qwewe');
        req._addBody("comment", comment);
        sinon.stub(CommentService, 'delete').resolves(<any>comment);
        
        await CommentController.delete(req, res, next);
        
        expect(res.statusCode).to.equal(400);
    });

    it('CreateComment - OK', async function() {
        
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => {};
        
        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new mongoose.Types.ObjectId('123165797d32723953989999')
        };
        
        req._setParameter('id','123165797d32723953989999')
        req._addBody("comment", comment);
        sinon.stub(CommentService, 'create').resolves(<any>comment);
        const spyJson = sinon.spy(res, 'json');
        
        await CommentController.create(req, res, next);
        
        const body = res._getJSONData();

        expect(spyJson.calledWith(comment)).to.be.true;
        expect(res.statusCode).to.equal(201);
        expect(JSON.stringify(body)).to.be.equals(JSON.stringify(comment));
    
    });

});