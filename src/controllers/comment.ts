import {Types} from 'mongoose';
import CommentService from '../services/comment';
import ControllerHelper from './helper/controllerHelper';
import { Request, Response } from "express";

class CommentController{
    
    static async fetch(req: Request, res: Response, next: Function){
        try {
            if (!ControllerHelper.isValidId(req.params.article)){
                return res.status(400).send('article is not valid');
            }

            var result = await CommentService.findByArticleId(new Types.ObjectId(req.params.article));
            if(!result || result.length == 0){
                return res.status(404).send('Related comments not found');
            }
            res.send(result);

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
            var result = await CommentService.find(new Types.ObjectId(req.params.id));
            if(!result){
                return res.status(404).send('Comment not found');
            }

            res.send(result);

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
            res.send(await CommentService.update(new Types.ObjectId(req.params.id), req.body.comment));
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async create(req: Request, res: Response, next: Function){
        try {
            res.status(201).send(await CommentService.create(req.body.comment));
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async delete(req: Request, res: Response, next: Function){
        try {
            if (!ControllerHelper.isValidId(req.params.id)){
                return res.status(400).send('id is not valid');
            }
            res.send(await CommentService.delete(new Types.ObjectId(req.params.id)));
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default CommentController;