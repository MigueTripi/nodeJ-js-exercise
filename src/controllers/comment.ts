import {Types} from 'mongoose';
import CommentService from '../services/comment';
import ControllerHelper from './helper/controllerHelper';
import { Request, Response } from "express";

class CommentController{
    
    static async fetch(req: Request, res: Response, next: Function){
        try {
            if (!ControllerHelper.isValidId(req.params.article)){
                return res.status(400).json('article is not valid');
            }

            const result = await CommentService.findByArticleId(new Types.ObjectId(req.params.article));
            if(!result || result.length == 0){
                return res.status(404).json('Related comments not found');
            }
            res.json(result);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async find(req: Request, res: Response, next: Function){
        try {
            if (!ControllerHelper.isValidId(req.params.id)){
                return res.status(400).json('id is not valid');
            }
            const result = await CommentService.find(new Types.ObjectId(req.params.id));
            if(!result){
                return res.status(404).json('Comment not found');
            }

            res.json(result);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async update(req: Request, res: Response, next: Function){
        try {
            if (!ControllerHelper.isValidId(req.params.id)){
                return res.status(400).json('id is not valid');
            }
            res.json(await CommentService.update(new Types.ObjectId(req.params.id), req.body.comment));
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async create(req: Request, res: Response, next: Function){
        try {
            if (!ControllerHelper.isValidId(req.body.comment.articleId)){
                return res.status(400).json('id is not valid');
            }
            res.status(201).json(await CommentService.create(req.body.comment));
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async delete(req: Request, res: Response, next: Function){
        try {
            if (!ControllerHelper.isValidId(req.params.id)){
                return res.status(400).json('id is not valid');
            }
            res.json(await CommentService.delete(new Types.ObjectId(req.params.id)));
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default CommentController;