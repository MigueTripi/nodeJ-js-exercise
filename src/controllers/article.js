const Mongoose = require('mongoose');
const ArticleService = require('../services/article');
const ControllerHelper = require('./helper/controllerHelper');

class ArticleController {
    
    static async fetch(req, res){
        try {
            res.send(await ArticleService.fetch());
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
            var result = await ArticleService.find(Mongoose.Types.ObjectId(req.params.id));
            if(!result){
                return res.status(404).send('Article not found');
            }
            else{
                res.send(result);
            }
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
            res.send(await ArticleService.update(req.params.id, req.body.article));
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async create(req, res){
        res.status(201).send(await ArticleService.create(req.body.article));
    }

    static async delete(req, res){
        try {
            if (!ControllerHelper.isValidId(req.params.id)){
                return res.status(400).send('id is not valid');
            }
            res.send(await ArticleService.delete(req.params.id));            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ArticleController;