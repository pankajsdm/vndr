/*
 * @file: favoriteRating.js
 * @description: It Contain function layer for booking service.
 * @author: Smartdata
 */
import Booking from './../collections/booking/db-schema';
import Message from '../utilities/messages';
import mongoose from 'mongoose';


/* Create booking */
export const create = async (payload) => {
    return await Booking.create(payload);
}


/* Get all booking */
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

    let matchObj = {
          isDeleted:false,
          $or: [
            { 'name': { $regex: regex } }
          ]
        };
    let count = await Booking.find(matchObj).count()
    let data = await Booking.find(matchObj, {
            updatedAt: 0
        })
        .skip(skip)
        .limit(limit)
        .sort(sort);

    return {
        data: data,
        total: count
    }
}

/* Get booking based on id */
export const get = async (payload) => {
    return await Booking.findOne(payload, {
        vendorId: 1,
        customerId: 1,
        items: 1
    });
}

/* Update booking based on id */
export const update = async (query, payload) => {
   
}

/* Update booking based on id */
export const updateStatus = async (query, payload) => {
    return await Booking.findOneAndUpdate(query, payload);
}


/* Remove booking based on id */
export const remove = async (query,body) => {
}
