/*
* @file: tag.js
* @description: It contain all routers of tag .
* @author: Smartdata
*/

import { authorization } from '../utilities/universal';
import * as TAG from '../controllers/tag';
import paramValidation from './validations/param-validation'; 
import validate from 'express-validation';

export default (path, router) => {
    router.post(`${path}/create`, authorization, validate(paramValidation.crudTags),   TAG.create);
    router.put(`${path}/update/:id`, authorization, validate(paramValidation.crudTags),  TAG.update); 
    router.get(`${path}/getAll`,  authorization, TAG.getAll); 
    router.get(`${path}/getTags`,  authorization, TAG.getTags); 
    router.get(`${path}/get/:id`, authorization,validate(paramValidation.get),  TAG.get); 
    router.delete(`${path}/delete/:id`, authorization,validate(paramValidation.delete),  TAG.remove); 
}   