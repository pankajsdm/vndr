/*
* @file: service.js
* @description: It contain all routers of services.
* @author: Smartdata
*/

import { authorizationVendor } from '../utilities/universal';
import * as SERVICES from '../controllers/service';
import paramValidation from './validations/param-validation'; 
import validate from 'express-validation';
export default (path, router) => {
    router.post(`${path}/create`, authorizationVendor, validate(paramValidation.crudService),  SERVICES.create);
    router.get(`${path}/getAll`, authorizationVendor, SERVICES.getAll); 
    router.get(`${path}/get/:id`, authorizationVendor,validate(paramValidation.get), SERVICES.get); 
    router.put(`${path}/update/:id`, authorizationVendor, validate(paramValidation.crudService), SERVICES.update); 
    router.put(`${path}/updateItemForApp/:id`, authorizationVendor, SERVICES.updateItemForApp); 
    router.delete(`${path}/delete/:id`, authorizationVendor,validate(paramValidation.delete), SERVICES.remove); 
    router.get(`${path}/vendor`, SERVICES.getByVendor); 
   
}