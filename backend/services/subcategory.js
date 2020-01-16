/*
 * @file: user.js
 * @description: It Contain function layer for user service.
 * @author: Smartdata
*/
import SubCategoryModel from '../collections/subcategory/db-schema';
import CategoryModel from '../collections/category/db-schema';
import Message from '../utilities/messages';
import mongoose from 'mongoose';
import {createSlug} from '../controllers/common';
/* Create category */   
export const create = async (payload) => {  
    payload.slug= await createSlug(payload.name);
    let reqObj = { slug : payload.slug, isDeleted : false }
    let codeExists =  await SubCategoryModel.findOne(reqObj);
    if (codeExists) throw new Error(Message.categoryNameAlreadyExits);    
    return await SubCategoryModel.create(payload);
}

/* Get all category */
export const getAll = async (payload) => {
    var matchObj=[{isDeleted:false}]
    if(payload['search']){
        const regex = new RegExp(`${payload['search']}`, 'i');       
         const obj={
            $or: [
                { 'name': { $regex: regex } }
              ]
        };
          matchObj.push(obj)
    }
    if(payload['categoryId']){
        const obj={categoryId:mongoose.Types.ObjectId(payload.categoryId)  };
          matchObj.push(obj)
    }
   
    let sort = {[payload.sortBy ? payload.sortBy :'createdAt']:-1}
    let limit = JSON.parse(payload.count);
    let skip = JSON.parse((payload.page-1) * limit);
    const queryObj = SubCategoryModel.find({$and: matchObj}, {updatedAt:0}); 
    let data =  await queryObj.populate({path:'categoryId', select:'name'}).skip(skip).limit(limit).sort(sort);
    let count = await queryObj.count()
    return {
        data:data,
        total:count
    }
}

export const getCategoriesList = async (payload) => {
    let matchObj = {
          isDeleted:false,
          isActive:true
        };
    return await CategoryModel.find(matchObj, {name:1}) 
}

/* Get category based on id */
export const get = async (payload) => {
    return await SubCategoryModel.findOne(payload, {name:1,description:1,categoryId:1});
}
/* Get category based on id */
export const categoryById = async (payload) => {
    return await SubCategoryModel.find(payload, {name:1,description:1,categoryId:1});
}

/* Update category based on id */
export const update = async (query, payload) => {
    payload.slug= await createSlug(payload.name);
    var obj={slug:payload.slug, isDeleted : false,_id: {$ne: mongoose.Types.ObjectId(query._id)}}
    const codeExists = await SubCategoryModel.findOne(obj, {_id:1});
    if (codeExists) throw new Error(Message.categoryNameAlreadyExits);
    return await SubCategoryModel.findOneAndUpdate(query, payload);
}

/* Update Category based on id */
export const updateStatus = async (query, payload) => {
    return await SubCategoryModel.findOneAndUpdate(query, payload);
}


/* Remove category based on id */
export const remove = async (query,body) => {
    return await SubCategoryModel.findOneAndUpdate(query,body);
}





