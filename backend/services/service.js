/*
 * @file: service.js
 * @description: It Contain function layer for user service.
 * @author: Smartdata
 */
import mongoose from 'mongoose';
import Service from './../collections/service/db-schema';
import Message from '../utilities/messages';
const fs = require('fs-extra');
import {createSlug} from '../controllers/common';
const imagePath = './public/uploads/images/';

/*
* Remove uploaded image
*/
let imageRemove = async (filePath) => {
    return new Promise(resolve => {
        filePath.forEach(async (path) => {
            fs.unlinkSync(path, function(error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('removed');
                }                
            });
        });
    });
};

/* Create service */
export const create = async (payload) => {
    payload.slug = await createSlug(payload.name);
    var obj = {slug: payload.slug, isDeleted: false,}
    const codeExists = await Service.findOne(obj);
    if (codeExists) throw new Error(`${payload.name} ${Message.nameAlreadyExits}`);
    let reqObj = {
        name: payload.name,
        isDeleted: true
    }
    let res = await Service.create(payload);
    if(res && res._id){
        checkDirectory(payload.vendorId, res._id);
    }
    //let data = await Service.findOne(reqObj);
    return res;
}


/* Get all services */
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
        isDeleted: false,
        vendorId: payload.vendorId,
        $or: [{
            "name": {
                $regex: regex
            }
        }]
    };
    const queryObj = Service.find(matchObj, {name: 1,createdAt: 1,description: 1,image:1});
   
    let data = await queryObj.skip(skip).limit(limit).sort(sort);
    let count = await queryObj.count();
    return {
        data: data,
        directory: 'items',
        total: count
    }
}

/* Get service based on id */
export const get = async (payload) => {
    let getdata =  await Service.findOne(payload)
    .populate({path:'categoryId', select:'name'})
    .populate({path:'subcategoryId', select:'name'}).lean();

    console.log("getdata", getdata)
    getdata['itemDirecotry'] = 'items';
    getdata['packageDirecotry'] = 'packages';

    return getdata;
}


/* Update service based on id */
export const update = async (query, payload) => {
    payload.slug= await createSlug(payload.name);
    var obj = {
        slug: payload.slug,
        isDeleted: false,
        _id: { $ne: mongoose.Types.ObjectId(query._id)}
    }
    const codeExists = await Service.findOne(obj);
    if (codeExists) throw new Error(`${payload.name} ${Message.nameAlreadyExits}`);
    let update = await Service.findOneAndUpdate(query, payload);
    if(update){
        checkDirectory(query.vendorId, query._id);
        return update;
    }
}

/* 
* This service is meant for mobile app to update item package 
* Created Date: 5.Nov.2019
*/
export const updateItemForApp = async (query, payload) => {
    if(payload.packageId){
        query["items._id"] = payload.packageId;
        let set = { $set: {"items.$": payload.itemDetail} };
        let update =  await Service.findOneAndUpdate(query, set, {new: true} ); 
        if(update){
            checkDirectory(query.vendorId, query._id);
            return update; 
        }
    }else{
        let push = {$push: {"items": payload.itemDetail}};
        let update =   await Service.findOneAndUpdate(query, push);
        if(update){
            checkDirectory(query.vendorId, query._id);
            return update;
        }
    }
}

/* Remove service based on id */
export const remove = async (payload,body) => {    
    let service = await Service.findOneAndUpdate(payload,body);
    let status = Service.remove(payload);

    if(status){
        if(fs.existsSync(`${imagePath}items/${payload._id}`)){
            fs.remove(`${imagePath}items/${payload._id}`);
        }
        if(fs.existsSync(`${imagePath}packages/${payload._id}`)){
            fs.remove(`${imagePath}packages/${payload._id}`);
        }
    }  
    return status; 
}

/* Get all services */
export const getByVendor = async (payload) => {
    let regex = '';
    let sort = '';
    let page = (payload && payload.page) ? payload.page : 1;
    let limit = (payload && payload.count) ? JSON.parse(payload.count) : 10;
    let skip = JSON.parse((page - 1) * limit);

    if (payload && payload.search) {
        regex = new RegExp(`${payload['search']}`, 'i');
    }
    if (payload && payload.sortBy) {
        sort = {
            [payload.sortBy ? payload.sortBy : 'createdAt']: -1
        }
    }
    Service.aggregate([
        {
            $match: {
                "vendorId": mongoose.Types.ObjectId(payload.vendorId)
            }
        }, {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        }, {
            $unwind: "$category"
        }, {
            $lookup: {
                from: "subcategories",
                localField: "subcategoryId",foreignField: "_id",
                as: "subcategory"
            }
        }, {
            $unwind: "$subcategory"
        }, {
            $project: {
                _id: 1,
                service: "$name",
                category: "$category.name",
                subcategory: "$subcategory.name"
            }
        }
    ]).exec(function (err, result) {
        return {
            data: result
        }
    });

}

/* 
* Function is to create new directory
* copy Service, Items image from Temp directory
*/
let checkDirectory = (vendorId, _id) => {

    if(!fs.existsSync(`${imagePath}packages/${_id}`)){
        fs.mkdirSync(`${imagePath}packages/${_id}`);
    }
    if(!fs.existsSync(`${imagePath}items/${_id}`)){
        fs.mkdirSync(`${imagePath}items/${_id}`);
    }

    fs.copy(`${imagePath}temp/packages/${vendorId}`, `${imagePath}packages/${_id}`, err => {
        if(err) return console.error(err);
    });
    fs.copy(`${imagePath}temp/items/${vendorId}`, `${imagePath}items/${_id}`, err => {
        if(err) return console.error(err);
    });
    
}
