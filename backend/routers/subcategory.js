/*
* @file: category.js
* @description: It contain all routers of category .
* @author: Smartdata
*/

import { authorization } from '../utilities/universal';
import * as SUBCATEGORY from '../controllers/subcategory';
import paramValidation from './validations/param-validation'; 
import validate from 'express-validation';
export default (path, router) => {
    router.post(`${path}/create`,authorization, validate(paramValidation.crudCommon),   SUBCATEGORY.create);
    router.get(`${path}/getAll`, SUBCATEGORY.getAll); 
    router.get(`${path}/getCategoriesList`,authorization,  SUBCATEGORY.getCategoriesList);
    router.get(`${path}/get/:id`,authorization,validate(paramValidation.get),  SUBCATEGORY.get); 
    router.get(`${path}/categoryById/:id`,validate(paramValidation.get),  SUBCATEGORY.categoryById); 
    router.put(`${path}/update/:id`,authorization, validate(paramValidation.crudCommon),  SUBCATEGORY.update); 
    router.put(`${path}/updateStatus/:id`,authorization,validate(paramValidation.statusUpdate),  SUBCATEGORY.updateStatus); 
    router.delete(`${path}/delete/:id`,authorization,validate(paramValidation.delete),  SUBCATEGORY.remove); 
   
}


// router.post(`${path}/create`, authorization,  CATEGORY.create);