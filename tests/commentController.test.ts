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
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        req._setParameter('article','123165797d3272395398efe7')
        sinon.stub(CommentService, 'findByArticleId').resolves([]);
        var spySend = sinon.spy(res, 'json');

        await CommentController.fetch(req, res, next);

        //var body = res._getJSONData();
        console.log("DEBUG - ", spySend.callCount);
        // console.log("DEBUG - ", body);
        expect(res.statusCode).to.equal(404);
    
    });
    
    it('GetComment - Of existing article', async function() {
        const comment = <IComment>{
            author: 'author',
            body: 'body',
            articleId: new mongoose.Types.ObjectId('123165797d3272395398efe7')
        };
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        req._setParameter('article','123165797d3272395398efe7')
        sinon.stub(CommentService, 'findByArticleId').resolves([<any>comment]);
        var spySend = sinon.spy(res, 'json');
        
        await CommentController.fetch(req, res, next);
        
        var body = res._getJSONData();
        expect(spySend.calledWith([comment])).to.be.true;
        expect(body.length).to.be.equals(1);
        
    });

    it('GetComment - bad request', async function() {
        
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        
        req._setParameter('article','sdf')
        CommentController.find(req, res, next);
        
        expect(res.statusCode).to.equal(400);
    });
    
    it('GetComment - not found', async function() {
        
        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        req._setParameter('id','123165797d3272395398efe7')
        
        sinon.stub(CommentService, 'find').resolves(null);        
        var spySend = sinon.spy(res, 'json');
    
        await CommentController.find(req, res, next);
    
        expect(spySend.callCount).to.be.equals(1);
        expect(res.statusCode).to.equal(404);    
    });
    
    it.skip('CommentsUpdate - OK', async function() {
        const comment = <IComment>{
            author: 'author',
            body: 'body'
        };

        var req = mocks.createRequest();
        var res = mocks.createResponse();
        var next = () => {};
        req._setParameter('id','62f165797d3272395398efe7')
        
        // sinon.stub(CommentService, 'update').resolves((id: string, newArticle: any) => {
        //     comment = newArticle;
        //     return comment;
        // });        

        // sinon.stub(CommentService, "update").callsFake((id: string, newArticle: any) => {
        //     comment = newArticle;
        //     return comment;
        // });

        var spySend = sinon.spy(res, 'json');
    
        await CommentController.find(req, res, next);
    
        // console.log("DEBUG - ", spySend.callCount);
        // console.log("DEBUG - ", body);
        var body = res._getJSONData();
        expect(spySend.callCount).to.be.equals(1);
        expect(res.statusCode).to.equal(200);
        expect(body._id).to.equal('62f165797d3272395398efe7');
    
    });
});