/*
 * @description: It Contain db schema for tag collection.
 * @author: Smartdata
 */

import mongoose from 'mongoose';
const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tags: [
    {
      name: {
        type: String,
        default: '',
      },
    }
  ],
  createdAt: {
    type: Date,
    default:new Date() 
  },
  updatedAt: {
    type: Date,
    default:new Date()
  }
});

mongoose.model('Tag', tagSchema);
module.exports = mongoose.model('Tag');
