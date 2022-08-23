import mongoose from 'mongoose';
import ArticleService from '../services/article';
import ControllerBase from './base';
import { Request, Response } from "express";

class ArticleController extends ControllerBase {
    
    static async fetch(req: Request, res: Response, next: Function){
        try {
            res.json(await ArticleService.fetch());
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async find(req: Request, res: Response, next: Function){
        try {
            debugger;
            if (!this.isValidId(req.params.id)){
                return res.status(400).json('id is not valid');
            }
            const result = await ArticleService.find(new mongoose.Types.ObjectId(req.params.id));
            if(!result){
                return res.status(404).json('Article not found');
            }
            else{
                res.json(result);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async update(req: Request, res: Response, next: Function){
        try {
            if (!this.isValidId(req.params.id)){
                return res.status(400).json('id is not valid');
            }
            res.json(await ArticleService.update(req.params.id, req.body.article));
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async create(req: Request, res: Response, next: Function){
        res.status(201).json(await ArticleService.create(req.body.article));
    }

    static async delete(req: Request, res: Response, next: Function){
        try {
            if (!this.isValidId(req.params.id)){
                return res.status(400).json('id is not valid');
            }
            res.json(await ArticleService.delete(new mongoose.Types.ObjectId(req.params.id)));            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default ArticleController;