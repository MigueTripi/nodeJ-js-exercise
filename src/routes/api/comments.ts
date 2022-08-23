import { Router } from 'express';
import {CommentController} from '../../controllers';

const commentsApi = (router: Router) => {
    router.get('/:article', CommentController.fetch);
    router.post('/', CommentController.create);
    router.delete('/:id', CommentController.delete);
    router.put('/:id', CommentController.update);
    return router;
}

export default commentsApi