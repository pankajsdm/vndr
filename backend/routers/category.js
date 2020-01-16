/*
* @file: category.js
* @description: It contain all routers of category .
* @author: Smartdata
*/

import { authorization } from '../utilities/universal';
import * as CATEGORY from '../controllers/category';
import paramValidation from './validations/param-validation';
import validate from 'express-validation';

export default (path, router) => {
    router.post(`${path}/create`,authorization, validate(paramValidation.crudCategory), CATEGORY.create);
    router.get(`${path}/getAll`,  CATEGORY.getAll); 
    router.get(`${path}/get/:id`,authorization,validate(paramValidation.get),  CATEGORY.get); 
    router.put(`${path}/update/:id`,authorization,validate(paramValidation.crudCategory), CATEGORY.update); 
    router.put(`${path}/updateStatus/:id`,authorization,validate(paramValidation.statusUpdate), CATEGORY.updateStatus); 
    router.delete(`${path}/delete/:id`,authorization,validate(paramValidation.delete), CATEGORY.remove); 
   
}