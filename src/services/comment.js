const { Comment } = require("../models");

class CommentService {
    static findByArticleId(articleId){
        return Comment.find({"articleId": articleId});
    }

    static find(id){
        return Comment.findOne({"_id": id});
    }

    static create(comment){
        return Comment.create(comment);
    }

    static update(id, comment){
        return Comment.findByIdAndUpdate(id, comment).lean().exec();
    }
    
    static delete(id){
        return Comment.findByIdAndRemove(id).lean().exec();
    }

    static deleteByArticle(articleId){
        return Comment.findOneAndDelete({"articleId": articleId}).lean().exec();
    }
}

module.exports = CommentService;