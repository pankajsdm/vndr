/*
 * @description: It Contain db schema for category collection.
 * @author: Smartdata
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const subcategorySchema = new mongoose.Schema({
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
  description: {
    type: String,
    default: "",
     trim: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
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

mongoose.model('Subcategory', subcategorySchema);
module.exports = mongoose.model('Subcategory');
