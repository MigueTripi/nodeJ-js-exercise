import { Types } from "mongoose";

interface IComment{
    author: string,
    body: string,
    articleId: Types.ObjectId,
}

export default IComment;