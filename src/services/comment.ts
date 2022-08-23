import { Comment } from "../models";
import { Types } from 'mongoose';
import IComment from '../models/interfaces/IComment';

class CommentService {
    static findByArticleId(articleId: Types.ObjectId){
        return Comment.find({"articleId": articleId});
    }

    static find(id: Types.ObjectId){
        return Comment.findOne({"_id": id});
    }

    static create(comment: IComment){
        return Comment.create(comment);
    }

    static update(id: Types.ObjectId, comment: IComment){
        return Comment.findByIdAndUpdate(id, comment).lean().exec();
    }
    
    static delete(id: Types.ObjectId){
        return Comment.findByIdAndRemove(id).lean().exec();
    }

    static deleteByArticle(articleId: Types.ObjectId){
        return Comment.findOneAndDelete({"articleId": articleId}).lean().exec();
    }
}

export default CommentService;