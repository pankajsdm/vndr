
import Message from '../utilities/messages';
import { successAction, failAction } from '../utilities/response';
import * as CATEGORY from '../services/category';


/* Create category */
export const create = async (req, res, next) => {
    const payload = req.body;
    try{        
        payload.userId = req.user._id;
        const data = await CATEGORY.create(payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Get all category */
export const getAll = async (req, res, next) => {
    try{
        const data = await CATEGORY.getAll(req.query);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};  

/* Get category based on id */
export const get = async (req, res, next) => {
    try{
        let query = { _id: req.params.id, isDeleted:false }
        const data = await CATEGORY.get(query);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Update category based on id */
export const update = async (req, res, next) => {
    try{
        let query = { _id: req.params.id }
        req.body.userId = req.user._id;
        const data = await CATEGORY.update(query, req.body);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Update category based on id */
export const updateStatus = async (req, res, next) => {
    try{
        let query = { _id: req.params.id }
        const data = await CATEGORY.updateStatus(query, req.body);
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
        let body = {isDeleted : true};
        const data = await CATEGORY.remove(query,body);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};
