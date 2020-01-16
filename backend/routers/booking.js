/*
* @file: category.js
* @description: It contain all routers of category .
* @author: Smartdata
*/

import { authorizationCommon } from '../utilities/universal';
import * as BOOKING from '../controllers/booking';
import paramValidation from './validations/param-validation';
import validate from 'express-validation';

export default (path, router) => {
    router.post(`${path}/create`, authorizationCommon, BOOKING.create);
    router.get(`${path}/getAll`,  BOOKING.getAll); 
    router.get(`${path}/get/:id`, authorizationCommon,validate(paramValidation.get),  BOOKING.get); 
    router.put(`${path}/update/:id`, authorizationCommon,validate(paramValidation.crudCategory), BOOKING.update); 
    router.put(`${path}/updateStatus/:id`, authorizationCommon,validate(paramValidation.statusUpdate), BOOKING.updateStatus);
    router.delete(`${path}/delete/:id`, authorizationCommon,validate(paramValidation.delete), BOOKING.remove); 
}