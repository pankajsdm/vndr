
import Message from '../utilities/messages';
import { successAction, failAction } from '../utilities/response';
import * as BOOKING from '../services/booking';


/* Create booking */
export const create = async (req, res, next) => {
    const payload = req.body;
    try{        
        payload.userId = req.user._id;
        const data = await BOOKING.create(payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Get all booking */
export const getAll = async (req, res, next) => {
    try{
        const data = await BOOKING.getAll(req.query);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};  

/* Get booking based on id */
export const get = async (req, res, next) => {
    try{
        let query = { _id: req.params.id, isDeleted:false }
        const data = await BOOKING.get(query);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Update booking based on id */
export const update = async (req, res, next) => {
    
};

/* Update booking based on id */
export const updateStatus = async (req, res, next) => {
};

/* Remove booking based on id */
export const remove = async (req, res, next) => {
    try{
        let query = { _id: req.params.id}
        let body = { isDeleted : true };
        const data = await BOOKING.remove(query,body);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};
