/*
* @file: favoriteRating.js
* @description: It contain all routers of favoriteRating .
* @author: Smartdata
*/

import { authorizationCommon } from '../utilities/universal';
import * as FAVORITERATING from '../controllers/favoriteRating';
import paramValidation from './validations/param-validation';
import validate from 'express-validation';

export default (path, router) => {
    router.post(`${path}/create`, authorizationCommon, FAVORITERATING.create);
    router.get(`${path}/getAll`,  FAVORITERATING.getAll); 
    router.get(`${path}/get/:id`, authorizationCommon,validate(paramValidation.get),  FAVORITERATING.get); 
    router.put(`${path}/update/:id`, authorizationCommon,validate(paramValidation.crudCategory), FAVORITERATING.update); 
    router.put(`${path}/updateStatus/:id`, authorizationCommon,validate(paramValidation.statusUpdate), FAVORITERATING.updateStatus);
    router.delete(`${path}/delete/:id`, authorizationCommon,validate(paramValidation.delete), FAVORITERATING.remove); 
}