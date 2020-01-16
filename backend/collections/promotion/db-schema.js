/*
 * @description: It Contain db schema for category collection.
 * @author: Smartdata
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const promotionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  expiryDate: {
    type: Date,
    default:new Date() 
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

mongoose.model('Promotion', promotionSchema);
module.exports = mongoose.model('Promotion');
