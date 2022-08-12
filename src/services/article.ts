import { Types } from 'mongoose';
import {Article}  from '../models';
import IArticle from '../models/interfaces/IArticle';
import CommentService from './comment';

class ArticleService {
    static fetch(){
        return Article.find({}).lean().exec();
    }

    static find(id: Types.ObjectId): Promise<IArticle | null>{
        return Article.findOne({"_id": id}).lean().exec();
    }

    static create(article: IArticle){
        return Article.create(article);
    }

    static update(id: string, article: IArticle){
        return Article.findByIdAndUpdate(id, article).lean().exec();
    }
    
    static delete(id: Types.ObjectId){
        CommentService.deleteByArticle(id);
        return Article.findByIdAndRemove(id).lean().exec();
    }
}

export default ArticleService;