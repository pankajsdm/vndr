/*
 * @file: user.js
 * @description: It Contain function layer for user service.
 * @author: Smartdata
 */
import mongoose from 'mongoose';
const fs = require('fs-extra');
import User from '../collections/user';
import Message from '../utilities/messages';
import {
    encryptpassword,
    generateRandom,
    generateToken,
    getTimeStamp
} from '../utilities/universal';
import { frontendUrl } from '../utilities/constants'
import { SENDEMAIL } from '../lib/email/email-templates';
import { createSlug } from '../controllers/common'
const imagePath = './public/uploads/images/';

    
//social Register user
export const socialReg = async (payload) => {
    payload.email=payload.email.toLowerCase();
    var userExists = await User.checkEmail(payload.email);
    if (!userExists){
         userExists =  await User.saveUser({...payload});
    }
    let loginToken = generateJwtToken(userExists);
    const data =  await User.onLoginDone(userExists._id, loginToken);
    return {
        _id: data._id,
        email: data.email,
        loginToken: data.loginToken[data.loginToken.length - 1].token,
        lastLogin: data.lastLogin,
        role:data.role
    };

    // if (userExists){
       
    //     let loginToken = generateJwtToken(userExists);
    //     const data =  await User.onLoginDone(userExists._id, loginToken);
    //     return {
    //         _id: data._id,
    //         email: data.email,
    //         loginToken: data.loginToken[data.loginToken.length - 1].token,
    //         lastLogin: data.lastLogin,
    //         role:data.role
    //     };
    
    // }else{  
    //     const getuser =  await User.saveUser({...payload});        
    //     let loginToken = generateJwtToken(getuser);
    //     const data =  await User.onLoginDone(getuser._id, loginToken);
    //     return {
    //         _id: data._id,
    //         email: data.email,
    //         loginToken: data.loginToken[data.loginToken.length - 1].token,
    //         lastLogin: data.lastLogin,
    //         role:data.role  
    //     };
    // }
 }



 //Login User
 export const onLogin = async (payload) => {
    payload.email=payload.email.toLowerCase();
    const userData = await User.login(payload.email, encryptpassword(payload.password));
    if (!userData) throw new Error(Message.emailIdPasswordError);
    //if (!userData.isActive) throw new Error(Message.accountNotActive);
   // if (userData.expireToken!="") throw new Error(Message.userNotVerified);  
    let loginToken = generateToken({
        when: getTimeStamp(),
        _id: userData._id,
        role: userData.role,
        categoryId: userData.categoryId,
        subcategoryId: userData.subcategoryId
    });
    const data = await User.onLoginDone(userData._id, loginToken);

    let userObj = {
        _id: data._id,
        email: data.email,
        loginToken: data.loginToken[data.loginToken.length - 1].token,
        lastLogin: data.lastLogin,
        role:data.role,
        image: userData.image,
    }

    if(data.role==2){
        userObj['categoryId'] = data.categoryId,
        userObj['subcategoryId'] = data.subcategoryId
    }

    return userObj;
    
}

 //Login User
 export const logout = async (payload) => {
    const userData = await User.update( {_id : payload.id }, { $pull: { loginToken: { token: payload.token } } } )
    if (!userData) throw new Error(Message.emailNotExists);
    return userData;
 }

// Forgot password function and send link to email for password generate
export const forgotPasword = async (payload) => {
    payload.email=payload.email.toLowerCase();
    const userData = await User.checkEmail(payload.email);
    if (!userData) throw new Error(Message.emailNotExists);
    
    userData['expireToken']  = generateRandom(6,false);    
    let saveData            =  await User.saveUser(userData);

    //return await SENDEMAIL('forgot-password',saveData);
}


// Reset password function get otp 
export const resetPasword = async (payload) => {
    let query = { expireToken: payload.otp }
    const userData = await User.findone(query);
    if (!userData) throw new Error(Message.otpExpired);
    userData['password']    = encryptpassword(payload.password);
    userData['expireToken'] = '';
    return  await User.saveUser(userData);
}

// Create any new user rolebase and send them link to reset password.
export const creteUser = async (payload) => {
    payload.email=payload.email.toLowerCase();
    if(payload.companyName){
        payload.slug = await createSlug(payload.companyName);
    }
    const userExists = await User.checkEmail(payload.email);
    if (userExists) throw new Error(Message.emailAlreadyExists);
    const name=payload.companyName?payload.companyName:payload.name
    payload.slug= await createSlug(name);
    payload['password']    = encryptpassword(payload.password);
    payload['expireToken'] = generateRandom(8,true);
    let saveData            =  await User.saveUser(payload);
    saveData['url']         = `${frontendUrl}email-verification/${saveData['expireToken']}`

    //let emailSent = await SENDEMAIL('create-user',saveData);

    let loginToken = generateToken({
        when: getTimeStamp(),
        role: payload.role,
        _id: saveData._id,
        categoryId: saveData.categoryId?saveData.categoryId:"",
        subcategoryId: saveData.subcategoryId?saveData.subcategoryId:""
    });
    const data = await User.onLoginDone(saveData._id, loginToken);

    return {
        _id: data._id,
        email: data.email,
        loginToken: data.loginToken[data.loginToken.length - 1].token,
        lastLogin: data.lastLogin,
        role:data.role,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId
    };

}

// Update user tags
export const updateUserByField = async (query,data) => {
    let updateStatus =  await User.update(query, {$set: data}, {new: true})
    if(updateStatus){
        checkDirectory(query._id);
    }
    return updateStatus;
}

// Update user tags
export const addAddress = async (query,data) => {
    return await User.update(query, {$push: data}, {new: true});
}

// Update user tags
export const updateAddress = async (query, data) => {
    let set;
    if(data.type==='customerAddress'){
        query = { "_id": query.id, "customerAddress._id":  query.addressId}
        set = { $set: {"customerAddress.$": data} };
    }
    return await User.update(query, set, {new: true} ); 
}

// Remove address
export const removeAddress = async (query, data) => {
    let pull = {$pull: {[data.type]: {_id: query.addressId}}}
    return await User.update({_id: query.id}, pull); 
}



// Delete User function
export const softDeleteUser = async (payload) => {
    const userData = await User.findone(payload);
    if (!userData) throw new Error(Message.notFound);
    userData['isDeleted']    = true
    return  await User.saveUser(userData);
}

// Update User Detail function
export const updatUser = async (query,data) => {
    return await User.findOneAndUpdate(query,data,{new: true})
    
}

/* 
* Function is to create new directory
* copy user images from Temp directory
*/
let checkDirectory = (_id) => {
    if(!fs.existsSync(`${imagePath}users/${_id}`)){
        fs.mkdirSync(`${imagePath}users/${_id}`);
    }
    fs.copy(`${imagePath}temp/users/${_id}`, `${imagePath}users/${_id}`, err => {
        if(err) return console.error(err);
    });
}

// Update User Detail function
export const updateUserImage = async (query,data) => {
    return await User.update(query, {$set: data})
    
}



// Email verificaiton while signup
export const emailVerification = async (query,data) => {
    const userData =await User.findOneAndUpdate(query,data,{new: true})
    if (!userData) throw new Error(Message.notFound);
    return userData; 
}

export const findOne = async (query, metadata) => {
    return await User.findOne(query, metadata).populate('categoryId', {name: 1}).populate('subcategoryId', {name:1});
}
/* Get all User */
export const getAll = async (payload) => {

    let limit = '';
    let skip = '';
    let regex = '';
    let sort = '';
    if (payload && payload.count) {
        limit = JSON.parse(payload.count);
    }
    if (payload && payload.page) {
        skip = JSON.parse((payload.page - 1) * limit);
    }
    if (payload && payload.search) {
        regex = new RegExp(`${payload['search']}`, 'i');
    }
    if (payload && payload.sortBy) {
        sort = {
            [payload.sortBy ? payload.sortBy : 'createdAt']: -1
        }
    }
    const key = payload.key
    let matchObj = {
          role:payload.role,
          isDeleted:false,
          $or: [
            { [key]: { $regex: regex }  }
          ]
        };

    const queryObj = User.find(matchObj, {updatedAt: 0}) 
    let data = await queryObj.populate({path:'categoryId', select:'name'})
        .populate({path:'subcategoryId', select:'name'})
        .skip(skip)
        .limit(limit)
        .sort(sort);
    let count = await queryObj.count()
    return {
        data: data,
        total: count
    }
}


/* Update User based on id */
export const updateStatus = async (query, payload) => {
    return await User.findOneAndUpdate(query, payload);
}


/* Remove User based on id */
export const remove = async (query,body) => {
    return await User.findOneAndUpdate(query,body);
}

/*
* User defined function for multiple task
* Created By: Pankaj
* Created: 01.Oct.20019
*/

/* Generate jwt Token */
function generateJwtToken(user){
    let token = generateToken({
        when: getTimeStamp(),
        role: user.role,
        _id: user._id
    });
    return token;
}
