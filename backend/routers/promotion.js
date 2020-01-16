/*
* @file: PROMOTION.js
* @description: It contain all routers of category .
* @author: Smartdata
*/

import { authorization } from '../utilities/universal';
import * as PROMOTION from '../controllers/promotion';
import paramValidation from './validations/param-validation'; 
import validate from 'express-validation';
export default (path, router) => {
    router.post(`${path}/create`, authorization, validate(paramValidation.crudPromotion),   PROMOTION.create);
    router.get(`${path}/getAll`, authorization, PROMOTION.getAll); 
    router.get(`${path}/get/:id`, authorization,validate(paramValidation.get),  PROMOTION.get); 
    router.put(`${path}/update/:id`, authorization, validate(paramValidation.crudPromotion),  PROMOTION.update); 
    router.put(`${path}/updateStatus/:id`, authorization,validate(paramValidation.statusUpdate),  PROMOTION.updateStatus); 
    router.delete(`${path}/delete/:id`, authorization,validate(paramValidation.delete),  PROMOTION.remove); 
   
}

// router.post(`${path}/create`, authorization,  PROMOTION.create);