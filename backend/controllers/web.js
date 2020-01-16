import Message from '../utilities/messages';
import { successAction, failAction } from '../utilities/response';
import * as WEB from '../services/web';


/* Get all item for home screen */
export const homeItems = async (req, res, next) => {
    try{
        const data = await WEB.homeItems(req.body);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};  

/* Get vendor based on category  */
export const getVendorByCategory = async (req, res, next) => {
    try{
        const data = await WEB.getVendorByCategory(req.params);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};  

/* Get vendor based on id */
export const getVendorById = async (req, res, next) => {
    try{
        const data = await WEB.getVendorById(req.params);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};  


/* Get favorite rating based on vendor and customer id */
export const getFavoriteRating = async (req, res, next) => {
    try{
        const data = await WEB.getFavoriteRating(req.params);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};  


/* Get package by item id */
export const getPackageByItemId = async (req, res, next) => {
    try{
        const data = await WEB.getPackageByItemId(req.params);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};  