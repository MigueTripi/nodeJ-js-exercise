import {expect} from 'chai';
import 'mocha';
import CommentService from '../src/services/comment';
import IComment from '../src/models/interfaces/IComment';
import mongoose from 'mongoose';
import {Mockgoose} from 'mockgoose';

let mockgoose: Mockgoose = new Mockgoose(mongoose);
let comment: IComment;
let commentId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId('62f165797d32723953981111');
let articleId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId('62f165797d32723953982222');

before(() => {
	mockgoose.prepareStorage().then(() => {
		mongoose.connect('mongodb://localhost/Articles');
        mongoose.connection.on('connected', () => {  
            console.log('db connection is now open');
          });
	});
});

describe('CommentService', () => {

    beforeEach(() => {
        comment = <IComment>{
            _id: '62f165797d32723953981111',
            author: 'author',
            body: 'body',
            articleId: new mongoose.Types.ObjectId('62f165797d32723953982222')
        };
        CommentService.delete(commentId);
    });    
    
    it('GetComments - by article empty', async function() {
        
        const result = await CommentService.findByArticleId(articleId);
        expect(result.length).to.be.equals(0);
    });

    it('CreateComment - OK', async function() {
        
        const result = await CommentService.create(comment);

        expect(result.author).to.be.equals(comment.author);
        expect(result.body).to.be.equals(comment.body);
        expect(result._id.toString()).to.be.equals(commentId.toString());
    });

    it('CreateComment - and retrieve created', async function() {
        
        const created: any = await CommentService.create(comment);
        const retrieved: any = await CommentService.find(created._id);

        expect(created.author).to.be.equals(retrieved?.author);
        expect(created.body).to.be.equals(retrieved?.body);
        expect(created._id.toString()).to.be.equals(retrieved?._id.toString());
    });

    it('CreateComment - and retrieve a non existing comment', async function() {
        
        await CommentService.create(comment);
        const nonExisting = await CommentService.find(new mongoose.Types.ObjectId('111165797d3272395398efe7'));

        expect(nonExisting).to.be.null;
    });

    it('UpdateComment - validate updated comment', async function() {
        
        const created = await CommentService.create(comment);
        const createdId: mongoose.Types.ObjectId = created._id;
        comment.author = "updated";
        comment.body = "updated";
        await CommentService.update(createdId, comment);
        const updated: any = await CommentService.find(createdId); 

        expect(comment.author).to.be.equals(updated.author);
        expect(comment.body).to.be.equals(updated.body);
        expect(createdId.toString()).to.be.equals(updated._id.toString());
    });

    it('DeleteComment - OK', async function() {
        
        await CommentService.create(comment);
        await CommentService.delete(commentId);

        const nonExisting = await CommentService.find(commentId);

        expect(nonExisting).to.be.null;
    });
});