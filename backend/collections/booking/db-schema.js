/*
 * @description: It Contain db schema for booking collection.
 * @author: Smartdata
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bookingSchema = new mongoose.Schema({
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  itemId: {
    type: Schema.Types.ObjectId,
    ref: 'Service'
  },
  packages: [
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

  fromDate: {
    type: Date,
    default:new Date() 
  },

  toDate: {
    type: Date,
    default:new Date() 
  },

  address: {
    type: String,
    default: ''
  },
  
  /* 1->pending 2->approved 3->rejected */
  status: {
    type: String,
    enum : ['1','2','3'],
    default:'1',  
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

mongoose.model('Booking', bookingSchema);
module.exports = mongoose.model('Booking');
