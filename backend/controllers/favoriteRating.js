
import Message from '../utilities/messages';
import { successAction, failAction } from '../utilities/response';
import * as FAVORITERATING from '../services/favoriteRating';


/* Create favoriteRating */
export const create = async (req, res, next) => {
    const payload = req.body;
    try{        
        payload.userId = req.user._id;
        const data = await FAVORITERATING.create(payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Get all favoriteRating */
export const getAll = async (req, res, next) => {
    try{
        const data = await FAVORITERATING.getAll(req.query);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};  

/* Get favoriteRating based on id */
export const get = async (req, res, next) => {
    try{
        let query = { _id: req.params.id, isDeleted:false }
        const data = await FAVORITERATING.get(query);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Update favoriteRating based on id */
export const update = async (req, res, next) => {
    
};

/* Update favoriteRating based on id */
export const updateStatus = async (req, res, next) => {
};

/* Remove favoriteRating based on id */
export const remove = async (req, res, next) => {
    try{
        let query = { _id: req.params.id}
        let body = { isDeleted : true };
        const data = await FAVORITERATING.remove(query,body);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};
