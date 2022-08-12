import {expect} from 'chai';
import 'mocha';
import ArticleService from '../src/services/article';
import IArticle from '../src/models/interfaces/IArticle';
import mongoose from 'mongoose';
import {Mockgoose} from 'mockgoose';

let mockgoose: Mockgoose = new Mockgoose(mongoose);
let article: IArticle;
let articleId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId('62f165797d3272395398efe7');

before(() => {
	mockgoose.prepareStorage().then(() => {
		mongoose.connect('mongodb://localhost/Articles');
        mongoose.connection.on('connected', () => {  
            console.log('db connection is now open');
          });
	});
});

describe('ArticleService', () => {

    beforeEach(() => {
        article = <IArticle>{
            _id: '62f165797d3272395398efe7',
            author: 'author',
            body: 'body',
            title: 'title'
        };
        ArticleService.delete(articleId);
    });    
    
    it('GetArticles - WithoutArticles', async function() {
        
        var result = await ArticleService.fetch();
        expect(result.length).to.be.equals(0);
    
    });

    it('CreateArticle - OK', async function() {
        
        var result = await ArticleService.create(article);

        expect(result.title).to.be.equals(article.title);
        expect(result.author).to.be.equals(article.author);
        expect(result.body).to.be.equals(article.body);
        expect(result._id.toString()).to.be.equals(new mongoose.Types.ObjectId('62f165797d3272395398efe7').toString());
    });

    it('CreateArticle - and retrieve created', async function() {
        
        let created: any = await ArticleService.create(article);
        var retrieved: any = await ArticleService.find(created._id);

        expect(created.title).to.be.equals(retrieved?.title);
        expect(created.author).to.be.equals(retrieved?.author);
        expect(created.body).to.be.equals(retrieved?.body);
        expect(created._id.toString()).to.be.equals(retrieved?._id.toString());
    });

    it('CreateArticle - and retrieve a non existing article', async function() {
        
        await ArticleService.create(article);
        var nonExisting = await ArticleService.find(new mongoose.Types.ObjectId('111165797d3272395398efe7'));

        expect(nonExisting).to.be.null;
    });

    it('UpdateArticle - validate updated article', async function() {
        
        let created = await ArticleService.create(article);
        let createdId: mongoose.Types.ObjectId = created._id;
        article.title = "updated";
        article.author = "updated";
        article.body = "updated";
        await ArticleService.update(createdId.toString(), article);
        let updated: any = await ArticleService.find(createdId); 

        expect(article.title).to.be.equals(updated.title);
        expect(article.author).to.be.equals(updated.author);
        expect(article.body).to.be.equals(updated.body);
        expect(createdId.toString()).to.be.equals(updated._id.toString());
    });

    it('DeleteArticle - OK', async function() {
        
        await ArticleService.create(article);
        await ArticleService.delete(articleId);

        var nonExisting = await ArticleService.find(articleId);

        expect(nonExisting).to.be.null;
    });
});