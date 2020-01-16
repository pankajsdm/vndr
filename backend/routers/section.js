/*
* @file: service.js
* @description: It contain all routers of category .
* @author: Smartdata
*/

import { authorizationVendor } from '../utilities/universal';
import * as SECTION from '../controllers/section';
import paramValidation from './validations/param-validation';  
import validate from 'express-validation';
export default (path, router) => {
    router.post(`${path}/create`,authorizationVendor, validate(paramValidation.crudCommon),   SECTION.create);
    router.get(`${path}/getAll`, authorizationVendor,  SECTION.getAll); 
    router.get(`${path}/get/:id`,authorizationVendor,validate(paramValidation.get),  SECTION.get); 
    router.put(`${path}/update/:id`,authorizationVendor, validate(paramValidation.crudCommon),  SECTION.update); 
    router.put(`${path}/updateStatus/:id`,authorizationVendor,validate(paramValidation.statusUpdate),  SECTION.updateStatus); 
    router.delete(`${path}/delete/:id`,authorizationVendor,validate(paramValidation.delete),  SECTION.remove); 
   
}