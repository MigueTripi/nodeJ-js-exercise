import { Schema, model } from 'mongoose';
import IArticle from './interfaces/IArticle';

const ArticleSchema = new Schema<IArticle>( {
    title: {type: String, required: true},
    author: {type: String, required: true},
    body: {type: String, required: true}
}, {timestamps: true} );

const Article = model<IArticle>('Article', ArticleSchema);

export default Article;