/*
 * @description: It Contain db schema for category collection.
 * @author: Smartdata
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
  },
  description: {
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
  createdAt: {
    type: Date,
    default:new Date() 
  },
  updatedAt: {
    type: Date,
    default:new Date()
  }
});

mongoose.model('Category', categorySchema);
module.exports = mongoose.model('Category');
