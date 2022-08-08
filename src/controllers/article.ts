import mongoose from 'mongoose';
import ArticleService from '../services/article';
import ControllerHelper from './helper/controllerHelper';
import { Request, Response } from "express";

class ArticleController {
    
    static async fetch(req: Request, res: Response, next: Function){
        try {
            res.send(await ArticleService.fetch());
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async find(req: Request, res: Response, next: Function){
        try {
            if (!ControllerHelper.isValidId(req.params.id)){
                return res.status(400).send('id is not valid');
            }
            var result = await ArticleService.find(new mongoose.Types.ObjectId(req.params.id));
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

    static async update(req: Request, res: Response, next: Function){
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

    static async create(req: Request, res: Response, next: Function){
        res.status(201).send(await ArticleService.create(req.body.article));
    }

    static async delete(req: Request, res: Response, next: Function){
        try {
            if (!ControllerHelper.isValidId(req.params.id)){
                return res.status(400).send('id is not valid');
            }
            res.send(await ArticleService.delete(new mongoose.Types.ObjectId(req.params.id)));            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default ArticleController;