const {model, Schema} = require('mongoose');

const {ObjectId} = Schema;
const Comment = model('Comment', new Schema( {
    author: {type: String, required: true},
    body: {type: String, required: true},
    articleId: {type: ObjectId, required: true}
}, {timestamps: true} ));

module.exports = Comment;