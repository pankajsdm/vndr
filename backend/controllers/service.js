
import Message from '../utilities/messages';
import { successAction, failAction } from '../utilities/response';
import * as SERVICE from '../services/service';

/* Create service */
export const create = async (req, res, next) => {
    const payload = req.body;
    payload['vendorId']=req.user._id
    payload['categoryId']=req.user.categoryId
    payload['subcategoryId']=req.user.subcategoryId
    try{ 
        const data = await SERVICE.create(payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Get all service */
export const getAll = async (req, res, next) => {
    try {
        let query = {
            isDeleted: false,
            isActive: true,
            vendorId: req.user._id,
            search: req.query.search,
            page: req.query.page,
            count: req.query.count
        }
        const data = await SERVICE.getAll(query);
        if (data) {
            res.json(successAction(data, Message.success));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/* Get service based on id */
export const get = async (req, res, next) => {
    try{
        let query = { _id: req.params.id, isDeleted:false,vendorId: req.user._id }
        const data = await SERVICE.get(query);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Update service based on id */
export const update = async (req, res, next) => {
    try {
        let query = {_id: req.params.id, vendorId: req.user._id}
        const data = await SERVICE.update(query, req.body);
        if (data) {
            res.json(successAction(data, Message.success));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/* This service is meant for mobile app to update item package */
export const updateItemForApp = async (req, res, next) => {
    try {
        let query = {_id: req.params.id,  vendorId: req.user._id}
        const data = await SERVICE.updateItemForApp(query, req.body);
        if (data) {
            res.json(successAction(data, Message.success));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};

/* Remove service based on id */
export const remove = async (req, res, next) => {
    try{
        let query = { _id: req.params.id,vendorId: req.user._id}
        let body = {isDeleted : true};
        const data = await SERVICE.remove(query,body);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};

/* Get all service of the vendor */
export const getByVendor = async (req, res, next) => {
    try {
        if (!req.query.vendorId){
            res.json(failAction({param: 'vendorId', message: 'Param require'}));
            return false;
        }

        let query = {
            vendorId: req.query.vendorId,
            isDeleted: false,
            //search: req.query.search,
            page: req.query.page,
            count: req.query.count
        }
        const data = await SERVICE.getByVendor(query);
        if (data) {
            res.json(successAction(data, Message.success));
        } else {
            res.json(successAction([]));
        }
    } catch (error) {
        res.json(failAction(error.message));
    }
};