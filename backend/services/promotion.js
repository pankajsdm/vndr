/*
 * @file: user.js
 * @description: It Contain function layer for user service.
 * @author: Smartdata
*/
import PromotionModel from '../collections/promotion/db-schema';
import Message from '../utilities/messages';
import mongoose from 'mongoose';

/* Create PromotionModel */   
export const create = async (payload) => {
    let reqObj = { code : payload.code, isDeleted : false }
    let codeExists =  await PromotionModel.findOne(reqObj);
    if (codeExists) throw new Error(`${payload.code} ${Message.nameAlreadyExits}`);
    return await PromotionModel.create(payload);
}

/* Get all PromotionModel */
export const getAll = async (payload) => {
    const regex = new RegExp(`${payload['search']}`, 'i');
    let sort = {[payload.sortBy ? payload.sortBy :'createdAt']:-1}
    let limit = JSON.parse(payload.count);
    let skip = JSON.parse((payload.page-1) * limit);

    let matchObj = {
          isDeleted:false,
          $or: [
            { 'code': { $regex: regex } }
          ]
        };
   
    const queryObj = PromotionModel.find(matchObj,  {updatedAt: 0}); 
    let data =  await queryObj
    let count = await queryObj.count()
    .skip(skip)
    .limit(limit)
    .sort(sort);
   
    return {
        data:data,
        total:count
    }
}

/* Get PromotionModel based on id */
export const get = async (payload) => {
    return await PromotionModel.findOne(payload, {code:1,expiryDate:1});
}

/* Update PromotionModel based on id */
export const update = async (query, payload) => {
    var obj={
        code:payload.code,
        _id: {$ne: mongoose.Types.ObjectId(query._id)}
    }
    const codeExists = await PromotionModel.findOne(obj);
    if (codeExists) throw new Error(`${payload.code} ${Message.nameAlreadyExits}`);
    return await PromotionModel.findOneAndUpdate(query, payload);
}

/* Update PromotionModel based on id */
export const updateStatus = async (query, payload) => {
    return await PromotionModel.findOneAndUpdate(query, payload);
}

/* Remove PromotionModel based on id */
export const remove = async (query,body) => {
    return await PromotionModel.findOneAndUpdate(query,body);
}





