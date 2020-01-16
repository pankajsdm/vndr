/*
* @file: user.js
* @description: It Contain all routers of user.
* @author: Smartdata
*/

import { authorization, authorizationBoth, authorizationCommon } from '../utilities/universal';
import * as USER from '../controllers/user';
import paramValidation from './validations/param-validation';
import validate from 'express-validation';

export default (path, router) => {

    router.post(`${path}/login`,validate(paramValidation.login), USER.login)
    router.post(`${path}/register`,validate(paramValidation.register), USER.register);
    router.post(`${path}/signup`,validate(paramValidation.signup), USER.register);
    router.post(`${path}/socialRegister`,validate(paramValidation.get), USER.socialRegister)
    router.post(`${path}/byemail/`, USER.getUserByEmail)
    router.post(`${path}/forgotPassword`,USER.forgotPassword)
    router.post(`${path}/resetPassword`,USER.resetPassword)
    
    router.get(`${path}/detail/:id`, authorizationCommon, USER.getUser)
    router.get(`${path}/logout`, authorizationCommon, USER.logout)

    router.put(`${path}/email-verification`,USER.emailVerification)
    router.put(`${path}/update/:id`,authorizationCommon,  USER.updateUser); 
    router.put(`${path}/updateUserByField/:id`, authorizationCommon,  USER.updateUserByField); 
    router.put(`${path}/addAddress/:id`, authorizationCommon,  USER.addAddress); 
    router.put(`${path}/updateAddress/:id/:addressId`, authorizationCommon,  USER.updateAddress); 
    router.put(`${path}/removeAddress/:id/:addressId`, authorizationCommon,  USER.removeAddress); 
    router.put(`${path}/updateUserImage/:id`, authorizationBoth,  USER.updateUserImage); 
    router.get(`${path}/getAll`, authorizationBoth,  USER.getAll); 
    router.put(`${path}/updateStatus/:id`, authorizationBoth,validate(paramValidation.statusUpdate),  USER.updateStatus); 
    
    router.delete(`${path}/delete/:id`, authorizationBoth,validate(paramValidation.delete),  USER.remove); 

}
