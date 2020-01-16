
import Message from '../utilities/messages';
import { successAction, failAction } from '../utilities/response';
import * as PROMOTIONSERIVCE from '../services/promotion';


/* Create category */
export const create = async (req, res, next) => {
    const payload = req.body;
    try{ 
        const data = await PROMOTIONSERIVCE.create(payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Get all category */
export const getAll = async (req, res, next) => {
    try{
        const data = await PROMOTIONSERIVCE.getAll(req.query);
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
        const data = await PROMOTIONSERIVCE.get(query);
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
        const data = await PROMOTIONSERIVCE.update(query, req.body);
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
        const data = await PROMOTIONSERIVCE.updateStatus(query, req.body);
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
        const data = await PROMOTIONSERIVCE.remove(query,body);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};
