/*
 * @file: user.js
 * @description: It Contain function layer for user service.
 * @author: Smartdata
 */
import Category from './../collections/category/db-schema';
import Message from '../utilities/messages';
import mongoose from 'mongoose';
const fs = require('fs-extra');
import {createSlug} from '../controllers/common';
const imagePath = './public/uploads/images/';



/* Create category */
export const create = async (payload) => {
    let reqObj = {slug: payload.slug,isDeleted: false}
    let codeExists = await Category.findOne(reqObj);
    if (codeExists) throw new Error(`${payload.name} ${Message.nameAlreadyExits}`);
    payload.slug = await createSlug(payload.name);
    let status =  await Category.create(payload);
    if(status){
        checkDirectory(payload.userId, status._id);
    }
    return status;
}


/* Get all category */
export const getAll = async (payload) => {

    let limit = '';
    let skip = '';
    let regex = '';
    let sort = {[payload.sortBy ? payload.sortBy :'createdAt']:-1}
    if (payload && payload.count) {
        limit = JSON.parse(payload.count);
    }
    if (payload && payload.page) {
        skip = JSON.parse((payload.page - 1) * limit);
    }
    if (payload && payload.search) {
        regex = new RegExp(`${payload['search']}`, 'i');
    }
    
    let matchObj = {
          isDeleted:false,
          $or: [
            { 'name': { $regex: regex } }
          ]
        };
    const queryObj = Category.find(matchObj,  {updatedAt: 0});   
    let data = await queryObj.skip(skip).limit(limit).sort(sort);
    let count = await queryObj.count();
    return {
        data: data,
        total: count
    }
}

/* Get category based on id */
export const get = async (payload) => {
    return await Category.findOne(payload, {
        name: 1,
        description: 1,
        image: 1,
        path: 1
    });
}

/* Update category based on id */
export const update = async (query, payload) => {
    payload.slug= await createSlug(payload.name);
    var obj = {
        slug: payload.slug,
        isDeleted: false,
        _id: {$ne: mongoose.Types.ObjectId(query._id)}
    }
    const codeExists = await Category.findOne(obj);
    if (codeExists) throw new Error(`${payload.name} ${Message.nameAlreadyExits}`);
    payload.slug = await createSlug(payload.name);
    let status =  await Category.findOneAndUpdate(query, payload);
    if(status){
        checkDirectory(payload.userId, query._id);
    }
    return status;
}

/* Update Category based on id */
export const updateStatus = async (query, payload) => {
    return await Category.findOneAndUpdate(query, payload);
}


/* Remove category based on id */
export const remove = async (query,body) => {
    let status = await Category.findOneAndUpdate(query,body);
    if(status){
        if(fs.existsSync(`${imagePath}categories/${query._id}`)){
            fs.remove(`${imagePath}categories/${query._id}`);
        }
    }   
    return status;
}

/* 
* Function is to create new directory
* copy Service, Items image from Temp directory
*/
let checkDirectory = (userId, _id) => {
    if(!fs.existsSync(`${imagePath}categories/${_id}`)){
        fs.mkdirSync(`${imagePath}categories/${_id}`);
    }
    fs.copy(`${imagePath}temp/categories/${userId}`, `${imagePath}categories/${_id}`, err => {
        if(err) return console.error(err);
    });
}