import { Router } from 'express';
import { ArticleController } from '../../controllers';

const articlesApi = (router: Router) => {
    router.get('/', ArticleController.fetch);
    router.post('/', ArticleController.create);
    router.get('/:id/details', ArticleController.find);
    router.put('/:id', ArticleController.update);
    router.delete('/:id', ArticleController.delete);

    return router;
};

export default articlesApi;