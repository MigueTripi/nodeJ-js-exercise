const {model, Schema} = require('mongoose');

const ArticleSchema = new Schema( {
    title: {type: String, required: true},
    author: {type: String, required: true},
    body: {type: String, required: true}
}, {timestamps: true} );

const Article = model('Article', ArticleSchema);

module.exports = Article;