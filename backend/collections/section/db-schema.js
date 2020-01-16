/*
 * @description: It Contain db schema for section collection.
 * @author: Smartdata
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true,
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

mongoose.model('Section', sectionSchema);
module.exports = mongoose.model('Section');
