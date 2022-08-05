const {ArticleController} = require('../../controllers');

module.exports = router => {
    router.get('/', ArticleController.fetch);
    router.get('/:id/details', ArticleController.find);
    router.post('/', ArticleController.create);
    router.put('/:id', ArticleController.update);
    router.delete('/:id', ArticleController.delete);
    return router;
}