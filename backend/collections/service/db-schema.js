/*
 * @description: It Contain db schema for category collection.
 * @author: Smartdata
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const serviceSchema = new mongoose.Schema({
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
  sectionId: {
    type: Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  filePath: {
    type: String,
    default: "",
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  subcategoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Subcategory',
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    default: "",
    trim: true
  },
  startDateTime: {
    type: Date,
    default:new Date() 
  },
  endDateTime: {
    type: Date,
    default:new Date() 
  },
  items: [
    {
      name: {
        type: String,
        default: '',
      },
      price: {
        type: Number,
        default: 0,
      },
      desc: {
        type: String,
        default: '',
      },
      images: [],
    }
  ],
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

mongoose.model('Service', serviceSchema);
module.exports = mongoose.model('Service');
