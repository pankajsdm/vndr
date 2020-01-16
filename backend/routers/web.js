/*
* @file: web.js
* @description: It Contain all routers for web api's.
* @author: Smartdata
*/

import { authorization, authorizationBoth } from '../utilities/universal';
import * as WEB from '../controllers/web';

export default (path, router) => {
    router.post(`${path}/homeItems`, WEB.homeItems)
    router.get(`${path}/getVendorByCategory/:slug`, WEB.getVendorByCategory)
    router.get(`${path}/getFavoriteRating/:customerId/:vendorId`, WEB.getFavoriteRating)
    router.get(`${path}/getVendorById/:slug`,  WEB.getVendorById)
    router.get(`${path}/getPackageByItemId/:slug`, WEB.getPackageByItemId)
}