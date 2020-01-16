/*
 * @file: user.js
 * @description: It Contain function layer for user controller.
 * @author: Smartdata
 */

import Message from '../utilities/messages';
import {successAction, failAction} from '../utilities/response';
import * as USER from '../services/user';


/** social registration of user **/
export const socialRegister = async (req, res, next) => {
    const payload = req.body;
    try{ 
        const data = await USER.socialReg(payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/** User signup/register **/
export const register = async (req, res, next) => {
    const payload = req.body;
    try{ 
        const data = await USER.creteUser(payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/** Login user **/
export const login = async (req, res, next) => {
    
    const payload = req.body;
    try { 
        const data = await USER.onLogin(payload);
        res.json(successAction(data, Message.loginSuccessfull));
    } catch(error) {
        res.json(failAction(error.message));
    }
};
/** Logout user **/
export const logout = async (req, res, next) => {
    let payload = {
        id: req.user._id,
        token: req.user.token
    }
    try { 
        const data = await USER.logout(payload);
        res.json(successAction(data, Message.loginSuccessfull));
    } catch(error) {
        res.json(failAction(error.message));
    }
};

/**Get Session user **/
export const sessionUser = async (req, res, next) => {
    try { 
        const data = req.user
        res.json(successAction(data, Message.success));
    } catch(error) {
        res.json(failAction(error.message));
    }
};

/** Forgot pasword **/
export const forgotPassword = async (req, res, next) => {
    const payload = req.body;
    try { 
        const data = await USER.forgotPasword(payload);
        res.json(successAction(data, Message.forgotPassword));
    } catch(error) {
        res.json(failAction(error.message));
    }
};


/*** reset pasword **/
export const resetPassword = async (req, res, next) => {
    const payload = req.body;
    try {
        const data = await USER.resetPasword(payload);
        res.json(successAction(data, Message.passwordUpdated));
    } catch(error) {
        res.json(failAction(error.message));
    }
};

/*** Get User Detail by id **/
export const getUser = async (req, res, next) => {
    try{
        //let query = {_id:req.params.id,isActive: true}
        let query = {_id:req.params.id}
        let metadata={loginToken:0,password:0,isDeleted:0}
        const data = await USER.findOne(query, metadata);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
       
    } catch(error){
        res.json(failAction(error.message));
    }
};

/*** Get User Detail By Email ****/
export const getUserByEmail = async (req, res, next) => {
    try{
        let query = {
            email:req.body.email,
            isActive: true
        }   
        let metadata = {email:1, role: 1 }
        const data = await USER.findOne(query, metadata);
        if(data){
            res.json(successAction(data));
        }else{
            res.json(successAction([]));
        }
        
    } catch(error){
        res.json(failAction(error.message));
    }
};

/** Update User Detail */
export const updateUser = async (req, res, next) => {
    const payload = req.body;
    try{
        let query = { _id: req.params.id }
        const data = await USER.updatUser(query,payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/** Update User Detail */
export const updateUserImage = async (req, res, next) => {
    const payload = req.body;
    try{
        let query = { _id: req.params.id }
        const data = await USER.updateUserImage(query, payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/** Update User Tag */
export const updateUserByField = async (req, res, next) => {
    const payload = req.body;
    try{
        let query = { _id: req.params.id }
        const data = await USER.updateUserByField(query, payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/** Update address */
export const addAddress = async (req, res, next) => {
    const payload = req.body;
    try{
        let query = { _id: req.params.id }
        const data = await USER.addAddress(query, payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/** update address */
export const updateAddress = async (req, res, next) => {
    const payload = req.body;
    try{
        const data = await USER.updateAddress(req.params, payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};
/** Remove Address  */
export const removeAddress = async (req, res, next) => {
    const payload = req.body;
    try{
        const data = await USER.removeAddress(req.params, payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/*** Soft Delete User **/
export const deleteUser = async (req, res, next) => {
    try{
        let query = {
            _id:req.params.id
        }
        const data = await USER.softDeleteUser(query);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/***Get User Listing with pagination ***/
export const getUserListing = async (req, res, next) => {
    try{
        const data = await USER.findRecords(req.query);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

/** Update User Detail */
export const emailVerification = async (req, res, next) => {
    const token = req.body.token;
    try{
        let query = {expireToken:token}
        let payload={expireToken:""}
        const data = await USER.emailVerification(query,payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
};

export const getAll = async (req, res, next) => {
    try{
        const data = await USER.getAll(req.query);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
}; 
/* Update USER based on id */
export const updateStatus = async (req, res, next) => {
    try{
        let query = { _id: req.params.id }
        const data = await USER.updateStatus(query, req.body);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};
/* Remove USER based on id */
export const remove = async (req, res, next) => {
    try{
        let query = { _id: req.params.id}
        let body = {isDeleted : true};
        const data = await USER.remove(query,body);
        if(data){
            res.json(successAction(data, Message.success));
        }else{
            res.json(successAction([]));
        }
    } catch(error){
        res.json(failAction(error.message));
    }
};