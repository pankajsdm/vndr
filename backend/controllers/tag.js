
import Message from '../utilities/messages';
import { successAction, failAction } from '../utilities/response';
import * as TAG from '../services/tag';


/* Create tag */
export const create = async (req, res, next) => {
    const payload = req.body;
    try{        
        const data = await TAG.create(payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Update tag based on id */
export const update = async (req, res, next) => {
    try{
        let query = { _id: req.params.id }
        const data = await TAG.update(query, req.body);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};



/* Get all tag */
export const getAll = async (req, res, next) => {
    try{
        const data = await TAG.getAll(req.query);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};  

/* Get all tag */
export const getTags = async (req, res, next) => {
    try{
        const data = await TAG.getTags(req.query);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};  


/* Get section based on id */
export const get = async (req, res, next) => {
    try{
        let query = { _id: req.params.id }
        const data = await TAG.get(query);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Remove category based on id */
export const remove = async (req, res, next) => {
    try{
        let query = { _id: req.params.id}
        const data = await TAG.remove(query);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};