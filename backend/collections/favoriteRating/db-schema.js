/*
 * @description: It Contain db schema for category collection.
 * @author: Smartdata
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const favoriteRatingSchema = new mongoose.Schema({
  
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentCustomer: {
        type: String,
        default: "",
    },
    commentVendor: {
        type: String,
        default: "",
    },
    isCustomerFavorite: {
        type: Boolean,
        default: false,
    },
    isVendorFavorite: {
        type: Boolean,
        default: false,
    },
    customerRating: {
        type: String,
        default: "",
    },
    vendorRating: {
        type: String,
        default: "",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default:new Date() 
    },
    updatedAt: {
        type: Date,
        default:new Date()
    }
});

mongoose.model('favoriteRating', favoriteRatingSchema);
module.exports = mongoose.model('favoriteRating');
