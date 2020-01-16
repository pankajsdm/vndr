/*
 * @file: section.js
 * @description: It Contain function layer for user service.
 * @author: Smartdata
 */
import Section from './../collections/section/db-schema';
import Message from '../utilities/messages';
import mongoose from 'mongoose';

/* Create section */
export const create = async (payload) => {
    let reqObj = {
        name: payload.name,
        isDeleted: false
    }
     
    let codeExists = await Section.findOne(reqObj);
    if (codeExists) throw new Error(`${payload.name} ${Message.nameAlreadyExits}`);
    return await Section.create(payload);
}

/* Get all section */
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
          vendorId:mongoose.Types.ObjectId(payload.vendorId),
          $or: [
            { 'name': { $regex: regex } }
          ]
        };

    const queryObj = Section.find(matchObj,  {updatedAt: 0}); 
    let data = await queryObj.skip(skip).limit(limit).sort(sort);
    let count = await queryObj.count()
    return {
        data: data,
        total: count
    }
}

/* Get section based on id */
export const get = async (payload) => {
    return await Section.findOne(payload, {
        name: 1,
        description: 1,
        image: 1,
        path: 1
    });
}

/* Update section based on id */
export const update = async (query, payload) => {
    var obj = {
        name: payload.name,
        _id: {
            $ne: mongoose.Types.ObjectId(query._id)
        }
    }
    const codeExists = await Section.findOne(obj);
    if (codeExists) throw new Error(`${payload.name} ${Message.nameAlreadyExits}`);
    return await Section.findOneAndUpdate(query, payload);
}

/* Update section based on id */
export const updateStatus = async (query, payload) => {
    return await Section.findOneAndUpdate(query, payload);
}


/* Remove section based on id */
export const remove = async (query,body) => {
    return await Section.findOneAndUpdate(query,body);
}