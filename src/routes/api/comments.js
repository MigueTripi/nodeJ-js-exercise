const {CommentController} = require('../../controllers');

module.exports = router => {
    router.get('/:article', CommentController.fetch);
    router.post('/', CommentController.create);
    router.delete('/:id', CommentController.delete);
    router.put('/:id', CommentController.update);
    return router;
}