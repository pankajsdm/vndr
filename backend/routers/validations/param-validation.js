import Joi from 'joi';

export default {
  // POST register Vendor
  register: {
    body: {
      email: Joi.string().required().label('Email is required').min(1).max(100),
      companyName: Joi.string().required().label('Company Name is required').min(1).max(20),
      password: Joi.string().required().label("Password is required"),
      categoryId: Joi.string().required().label('Please select Category'),
      subcategoryId: Joi.string().required().label('Please select Sub-Category'),
      role: Joi.required().label('Please select role')
    },
  },

   // POST register User
  signup: {
    body: {
      name: Joi.string().required().label('Name is required').min(1).max(20),
      email: Joi.string().required().label('Email is required').min(1).max(100),
      password: Joi.string().required().label("Password is required"),
      role: Joi.required().label('Please select role')
    },
  },

  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().required().label('Email is required').min(1).max(100),
      password: Joi.string().required().label('Password is required')
    },
  }, 
  
   // Create crudCategory Update and Add
   crudCategory: {
    body: {
      name: Joi.string()
      .required()
      .min(1),
      description: Joi.string().required(),
      image: Joi.string().required()
    },
  },

  // Create crudCommon Update and Add
  crudCommon: {
    body: {
      name: Joi.string()
      .required()
      .min(1),
      description: Joi.string().required()
    },
  },

  // Create crudPromotion Update and Add
  crudPromotion: {
    body: {
      code: Joi.string()
      .required()
      .min(1),
      expiryDate: Joi.string().required()
    },
  },

   // Create crudService Update and Add
   crudService: {
    body: {
      name: Joi.string()
      .required().label('Item name is required')
      .min(1),
      description: Joi.string().required(),
      items: Joi.array().items(
            Joi.object({
              name:Joi.string().required().label('Package name is required'),
              price:Joi.number().required().label('Package price is required'),
              desc:Joi.string().required().label('Package description is required'),
              images:Joi.array().required().label('Package images is required')
            }).required().label('Package is required').min(1)
      ).required(),
      sectionId: Joi.string().required()
    },
  },

   // Create crudTags Update and Add
   crudTags: {
    body: {
      name: Joi.string()
      .required().label('Tags name is required')
      .min(1),
      tags: Joi.array().items(
            Joi.object({
              name:Joi.string().required().label('Tags is required')
            }).required().label('Tags is required').min(1)
      ).required()
    },
  },

  statusUpdate: {
    body: {
      _id: Joi.string().required().label('Id is required'),
      isActive: Joi.boolean().required()
    },
  },

  delete: {
    params: {
      id: Joi.string().alphanum().required(),
    },
  },

  get: {
    params: {
      id: Joi.string().alphanum().required(),
    },
  },
};
