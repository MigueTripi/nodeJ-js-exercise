import { Schema, model } from "mongoose";
import IComment from './interfaces/IComment';

const {ObjectId} = Schema.Types;
const CommentSchema = new Schema<IComment>( {
    author: {type: String, required: true},
    body: {type: String, required: true},
    articleId: {type: ObjectId, required: true}
}, {timestamps: true} );

const Comment = model<IComment>('Comment', CommentSchema);

export default Comment;