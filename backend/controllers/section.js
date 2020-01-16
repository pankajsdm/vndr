
import Message from '../utilities/messages';
import { successAction, failAction } from '../utilities/response';
import * as SECTION from '../services/section';


/* Create section */
export const create = async (req, res, next) => {
    const payload = req.body;
    payload['vendorId']=req.user._id
    try{    
        
        const data = await SECTION.create(payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Get all section */
export const getAll = async (req, res, next) => {
    try{
        req.query['vendorId']=req.user._id
        const data = await SECTION.getAll(req.query);
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
        let query = { _id: req.params.id, isDeleted:false,vendorId:req.user._id }
        const data = await SECTION.get(query);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Update section based on id */
export const update = async (req, res, next) => {
    try{
        let query = { _id: req.params.id,vendorId:req.user._id }
        const data = await SECTION.update(query, req.body);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Update section based on id */
export const updateStatus = async (req, res, next) => {
    try{
        let query = { _id: req.params.id,vendorId:req.user._id }
        const data = await SECTION.updateStatus(query, req.body);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Remove section based on id */
export const remove = async (req, res, next) => {
    try{
        let query = { _id: req.params.id,vendorId:req.user._id}
        let body = {isDeleted : true};
        const data = await SECTION.remove(query,body);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};
