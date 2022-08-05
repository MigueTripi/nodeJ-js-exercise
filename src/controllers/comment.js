const Mongoose = require('mongoose');
const CommentService = require('../services/comment');
const ControllerHelper = require('./helper/controllerHelper');

class CommentController{
    
    static async fetch(req, res, next){
        try {
            if (!ControllerHelper.isValidId(req.params.article)){
                return res.status(400).send('article is not valid');
            }

            var result = await CommentService.findByArticleId(Mongoose.Types.ObjectId(req.params.article));
            if(!result || result.length == 0){
                return res.status(404).send('Related comments not found');
            }
            res.send(result);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async find(req, res){
        try {
            if (!ControllerHelper.isValidId(req.params.id)){
                return res.status(400).send('id is not valid');
            }
            var result = await CommentService.find(Mongoose.Types.ObjectId(req.params.id));
            if(!result){
                return res.status(404).send('Comment not found');
            }

            res.send(result);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async update(req, res){
        try {
            if (!ControllerHelper.isValidId(req.params.id)){
                return res.status(400).send('id is not valid');
            }
            res.send(await CommentService.update(req.params.id, req.body.comment));
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async create(req, res){
        try {
            res.status(201).send(await CommentService.create(req.body.comment));
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async delete(req, res){
        try {
            if (!ControllerHelper.isValidId(req.params.id)){
                return res.status(400).send('id is not valid');
            }
            res.send(await CommentService.delete(req.params.id));
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = CommentController;