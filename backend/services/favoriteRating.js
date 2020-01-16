/*
 * @file: favoriteRating.js
 * @description: It Contain function layer for favoriteRating service.
 * @author: Smartdata
 */
import favoriteRating from './../collections/favoriteRating/db-schema';
import Message from '../utilities/messages';
import mongoose from 'mongoose';


/* Create favoriteRating */
export const create = async (payload) => {
    return await favoriteRating.create(payload);
}

/* Get all favoriteRating */
export const getAll = async (payload) => {

}
