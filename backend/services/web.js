/*
 * @file: web.js
 * @description: It Contain function layer for web service.
 * @author: Smartdata
 */

import mongoose from 'mongoose';
import UserSchema from './../collections/user/db-schema';
import favoriteRatingSchema from './../collections/favoriteRating/db-schema';
const User = mongoose.model('User', UserSchema);
import Category from './../collections/category/db-schema';
import Service from './../collections/service/db-schema';
import { USER_TYPE_USER, USER_TYPE_VENDOR, USER_TYPE_ADMIN} from './../utilities/constants';
const pictureUrl = "http://18.190.55.136:4598/assets/images/clown.png";
/*
* Get data for home page 
* Category, popularArroundYou vndrExp, topRatedVendor
*/
export const homeItems = async (payload) => {
    let categories = await getCategory({isDeleted: false,isActive:true});
    let popularArroundYouVendors = await getVendorPopularAndTopRatedYou(payload,'popular');
    let topRatedVendors = await getVendorPopularAndTopRatedYou(payload,'topRated');
    let vndrExp = {pictureUrl: pictureUrl}
    return {
        categories: categories,
        popularArroundYou: popularArroundYouVendors,
        vndrExp: vndrExp,
        topRatedVendor: topRatedVendors,
    } 
}

/*
* Get vendor based on category 
*/
export const getVendorByCategory = async (payload) => {
    return await getVendorPopularAndTopRatedYou(payload,'popular');
}


/*
* Get vendor based on id 
*/
export const getVendorById = async (payload,customer) => {
    let Query =  await getConditions(payload, "vendor");
    let matchObj=  {$match: { slug: payload.slug }}
    Query.push(matchObj);
    let vendorArr =  await User.aggregate(Query);
    let vendor =  vendorArr[0];
    let VendorServices =  await getVendorServices(vendor._id);
    
    let fevoritedData={}
    if(customer && customer._id && customer.role==USER_TYPE_USER ){
        fevoritedData = await getFavoriteRating(vendor._id, customer._id)
    }
    
    if(VendorServices){
        vendor['directory'] = 'users';
        vendor['directoryItems'] = 'items';
        vendor['items'] = VendorServices;
        vendor['fevoritedData'] = fevoritedData;
    }
    return vendor;
}

let getFavoriteRating = async(vendorId, customerId) => {
    let matchObj = {vendorId: vendorId, customerId: customerId};
    return await favoriteRatingSchema.findOne(matchObj, {isVendorFavorite:1, isCustomerFavorite:1, customerRating:1, vendorRating:1, commentCustomer:1, commentVendor:1, _id:0})
}


/*
* Get package by item id 
*/
export const getPackageByItemId = async(payload) => {
    let matchObj = { slug: payload.slug,isActive:true,isDeleted:false };
    let service =  await Service.findOne(matchObj, {slug:1, name:1, image: 1, description: 1, items:1,vendorId:1}) .populate({path:'vendorId', select:'companyName'}).lean();
    service['itemDirectory'] = 'items';
    service['packageDirectory'] = 'packages';
    return service;
}


/* 
* Defined helper function 
* Return promise data
* Created: 07.11.2019
*/

/* Get categories */
let getCategory = async (cond) => {
    if(cond._id){
        let data =  await Category.findOne(cond, {
            name:1, slug:1, image: 1
        }).lean();
        data['directory'] = 'categories';
        return data;
    }else{
        let data = await Category.find(cond, {
            name:1, slug:1, image: 1
        }).lean();
        return data.map((element) =>{
            return ({...element, directory: 'categories'})
        })
    }
}


/* Get vendors */
let getVendorPopularAndTopRatedYou = async (payload,type) => {  
        let Query =  await getConditions(payload,type);
        let dataArr =  await User.aggregate(Query);
        var arrOfObj = dataArr.map((element) =>{
            return ({...element, directory: `users`})
        })
        return arrOfObj;
}

/* Get vendor services */
let getVendorServices = async (vendorId) => {
    let matchObj = { isDeleted:false,isActive:true, vendorId: vendorId };
    let Query = [
        {
            "$match":matchObj
        }, 
        {
            $lookup: { 
                from : 'sections',
                localField : 'sectionId',
                foreignField : '_id',
                as : 'section'
            }
        },
        {
            $unwind : "$section"
        },
        {
            "$project":{"vendorId":1,"_id":1,"name":1,"description":1,"slug":1,"image":1, "price": { $min: "$items.price"},"section.name":1,"categoryId.name":1}
        },
        {
            $group: {
                _id: "$section.name",
                section:{
                    $push: {
                        "vendorId":"$vendorId","itemId":"$_id","itemName":"$name","itemDescription":"$description","itemSlug":"$slug"
                        ,"itemImage":"$image","price": "$price","sectionName":"$section.name"
                    }
                },
            }
        }
    ];      
    return await Service.aggregate(Query);
}


let getConditions = async (payload,type) => {  
    let Query = [];   
    let categorySlug = {   
        $match: {
            'categoryId.isDeleted' : false,
            'categoryId.isActive' : true
        }
    } 
    Query = [          
        {$match:{ isDeleted:false, isActive:true, role:USER_TYPE_VENDOR }},            
        {
            $lookup: { 
                from : 'categories',
                localField : 'categoryId',
                foreignField : '_id',
                as : 'categoryId'
            }
        },
        {
            $unwind : "$categoryId"
        },
        {
            $lookup: { 
                from : 'subcategories',
                localField : 'subcategoryId',
                foreignField : '_id',
                as : 'subcategoryId'
            }
        },
        {
            $unwind : "$subcategoryId"
        },
        {   
            $match: {
                'subcategoryId.isDeleted' : false,
                'subcategoryId.isActive' : true
            }
        },
        {
            $project : {
                    _id : 1,
                    companyName : 1,
                    aboutMe : 1,
                    image:1,
                    slug : 1,
                    rating:1,
                    image : 1,
                    categoryId : {_id : 1,slug : 1, name : 1,image : 1,isDeleted:1,isActive:1},
                    subcategoryId : {_id : 1,slug : 1,name : 1
                    }
                }
            }
        ];
        //Getting popular Near Around by geoLocation Vendors  
        if(payload.latLong && payload.latLong.length>0 && type=='popular'){
            Query.unshift({
               $geoNear: {
                  near: { type: "Point", coordinates: payload.latLong },
                  spherical: true,
                  distanceField: "calcDistance",
                  maxDistance: 500000, // In Meters
               }
            })
       } 
       //Getting Vendors Based on category Slug         
       if(payload.slug && (type=='popular' || type=='topRated')){
           categorySlug=  {   
               $match: {
                   'categoryId.isDeleted' : false,
                   'categoryId.isActive' : true,
                   'categoryId.slug' : payload.slug
               }
           }
       }
       Query.push(categorySlug); 

        //Getting Top Rated Vendors   
       if(type=='topRated'){
           var sort={
               $sort: {
                   rating: 1
                 }
           }
           Query.push(sort);
       } 
    return Query
}

