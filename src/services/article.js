const { Article } = require("../models");
const CommentService = require("./comment");

class ArticleService {
    static fetch(){
        return Article.find({}).lean().exec();
    }

    static find(id){
        return Article.findOne({"_id": id});
    }

    static create(article){
        return Article.create(article);
    }

    static update(id, article){
        return Article.findByIdAndUpdate(id, article).lean().exec();
    }
    
    static delete(id){
        CommentService.deleteByArticle(id);
        return Article.findByIdAndRemove(id).lean().exec();
    }
}

module.exports = ArticleService;