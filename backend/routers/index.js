/*
 * @file: index.js
 * @description: It Contain all routers.
 * @author: Smartdata
*/

import express from 'express';
import User from './user';
import Category from './category';
import Subcategory from './subcategory';
import Service from './service';
import Section from './section';
import Booking from './booking';
import FavoriteRating from './favoriteRating';
import Promotion from './promotion';
import Tag from './tag';
import Web from './web';
import Common from './common';
const router = express.Router();
    
/***** Define all routers *****/
User('/user', router);
Category('/category', router);
Promotion('/promotion', router);
Service('/service', router);
Tag('/tag', router);
Web('/web', router);
Section('/section', router);
Booking('/booking', router);
FavoriteRating('/favoriteRating', router);
Subcategory('/subcategory', router);
Common('/common', router);

/********************************/
export default router;