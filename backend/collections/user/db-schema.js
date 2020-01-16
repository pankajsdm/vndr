/*
 * @file: user.js
 * @description: It Contain db schema for user collection.
 * @author: Smartdata
 */
import validator from 'validator'
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    trim: true
  },
  companyName: {
    type: String,
    trim: true,
    default: ''
  },
  slug: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 1,
    unique: true,
    trim: true,
    validate:{
        validator: validator.isEmail,
        message:`Not a valid email`
    }
  },

  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  subcategoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Subcategory',
    default: null
  },
  numberOfBooking: {
    type: Number,
    default: null
  },
  countryCode: {
    type: String,
    default: null
  },
  phoneNumber: {
    type: String,
    default: null,
    trim: true
  },
  aboutMe: {
    type: String,
    default: null,
    trim: true
  },
  password: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum : ['1','2','3'],
    default:'3',  //1->admin 2->Vendor 3->customer
  },
  tags: [],
  status: {
    type: String,
    default:"Active",
    enum:'Active Deactive'.split(' ')
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  geoLocation: {
    location: {type: [Number, Number],index: '2d',default: [0,0]},
    formattedAddress: {type: Schema.Types.String,default: null}
  },  
  customerAddress: [
    {
      area: {
        type: String,
        default: '',
      },
      city: {
        type: String,
        default: '',
      },
      state: {
        type: String,
        default: '',
      },
      country: {
        type: String,
        default: '',
      },
      houseBuilding: {
        type: String,
        default: '',
      },
      pincode: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        default: '',
      },
      contact: {
        type: String,
        default: ''
      }
    }
  ],

  defaultCustomerAddress: {
    _id: {type: Schema.Types.ObjectId, ref: 'User'},
    area: {type: String,default: ''},
    city: {type: String,default: ''},
    state: {type: String,default: ''},
    country: {type: String,default: ''},
    houseBuilding: {type: String,default: ''},
    pincode: {type: String,default: ''},
    name: {type: String,default: ''},
    contact: {type: String,default: ''}
  },

  image: {
    type: String,
    default: null
  },
  loginToken:[
    {
      token: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default:new Date() 
      }
    }
  ],
  loginType: {
    type: String,
    default: ""
  },
  socialToken: {
    type: String,
    default: ""
  },
  rating : {
    type: Number,
    default: 3
  },
  expireToken:{type: String,default: ""},
  createdAt: {
    type: Date,
    default:new Date() 
  },
  updatedAt: {
    type: Date,
    default:new Date()
  }
});

export default userSchema;