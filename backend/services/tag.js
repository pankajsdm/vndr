/*
 * @file: user.js
 * @description: It Contain function layer for tag service.
 * @author: Smartdata
 */
import Tag from './../collections/tag/db-schema';

/* Create tag */
export const create = async (payload) => {
    return await Tag.create(payload);
}

/* Update tag based on id */
export const update = async (query, payload) => {
    return await Tag.findOneAndUpdate(query, payload);
}

/* Get all category */
export const getAll = async (payload) => {
    const regex = new RegExp(`${payload['search']}`, 'i');
    let sort = {[payload.sortBy ? payload.sortBy :'createdAt']:-1}
    let limit = JSON.parse(payload.count);
    let skip = JSON.parse((payload.page-1) * limit);
    let matchObj = {
          $or: [
            { 'name': { $regex: regex } }
          ]
    };
    const queryObj = Tag.find(matchObj, {createdAt:0,updatedAt:0}); 
    let data =  await queryObj.skip(skip).limit(limit).sort(sort).lean();
    let count = await queryObj.count()
    let filteredData = data.map(res => {
        res.tags = res.tags.map(tag => tag.name).join(',');
        return res;
    });
    return {
        data:filteredData,
        total:count
    }   
}

/* Get tag based on id */
export const get = async (payload) => {
    return await Tag.findOne(payload, {name:1,tags:1});
}

/* 
* Get all tag for searching purpose 
* In order to assign particular vendor
*/
export const getTags = async (payload) => {
    return await Tag.find(payload, {name:1});
}

/* Remove PromotionModel based on id */
export const remove = async (query,body) => {
    return await Tag.remove(query,body);
}