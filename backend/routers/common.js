/*
 * @file: common.js
 * @description: It Contain all routers of common.
 * @author: Manpreet Singh
 */

import { imageUpload, imageRemove, tempDirRemove } from '../controllers/common';
import { authorizationCommon } from '../utilities/universal';

export default (path,router) => {

    router.post(`${path}/upload`, authorizationCommon,  imageUpload)
    router.get(`${path}/removeTemp/:type`, authorizationCommon,  tempDirRemove)

}


