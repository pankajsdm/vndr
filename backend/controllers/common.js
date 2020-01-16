/*
 * @file: common.js
 * @description: It Contain function layer for common controller.
 * @author: Smartdata
 */

var Jimp = require('jimp');
const fs = require('fs-extra');
import { successAction, failAction } from '../utilities/response';
import Message from '../utilities/messages';
const imagePath = './public/uploads/images/';


/*
* imageUpload file 
* Single and multiple both file 
*/
export const imageUpload = async (req, res, next) => {
    await createFolders(req.user._id, req.body.imageLocation);
    try {
       let pathFile = `${imagePath}temp/${req.body.imageLocation}/${req.user._id}/`;
        let imgNameArray = []
        let myFile = req.files.images;
        let host = `${req.protocol}://${req.headers.host}/${req.body.imageLocation}/`;
         /* Handle multiple file upload */
        if (!!myFile.length) {
            for (let i = 0; i < myFile.length; i++) {
                let myfile = myFile[i];
                let fileName = myfile.name;
                fileName = fileName.replace(/\s+/g, '-').toLowerCase();
                fileName = Date.now() + '-' + fileName;
                let path = pathFile + fileName;
                let data = await myfile.mv(path)
                try{
                    await createDimensions(pathFile, fileName);
                    imgNameArray.push(fileName);
                }catch(err){
                    console.log(err);
                }
            }
        } else {
            /* Handle single file upload*/
            let fileName = myFile.name;
            fileName = fileName.replace(/\s+/g, '-').toLowerCase();
            fileName = Date.now() + '-' + fileName;
            let path = pathFile + fileName;
            let data = await myFile.mv(path);
            try{
                await createDimensions(pathFile, fileName);
                imgNameArray.push(fileName);
            }catch(err){
                console.log(err);
            }
        }
        res.json(successAction({imgNameArray: imgNameArray}, Message.uploadSuccessfully));
    } catch (error) {
        res.json(failAction(error.message));
    }
};



/* remove temp items and pacakges directory */
export const tempDirRemove = async (req, res) => {
    if(req.params.type=='items'){
        if(fs.existsSync(`${imagePath}temp/items/${req.user._id}`)){
            fs.emptyDirSync(`${imagePath}temp/items/`); 
        }
        if(fs.existsSync(`${imagePath}temp/packages/${req.user._id}`)){
            fs.emptyDirSync(`${imagePath}temp/packages/`); 
        }
        res.json(successAction(Message.success));
    }else{
        if(fs.existsSync(`${imagePath}temp/${req.params.type}/${req.user._id}`)){
            fs.emptyDirSync(`${imagePath}temp/${req.params.type}/`); 
        }
        res.json(successAction(Message.success));
    }

}

/* Make string slug  */
export const createSlug = async (req) => {
    req = req.replace(/\s+/g, '-');	
    req = req.replace(/[`~!@#$%^&*()_\+=\[\]{};:"\\|\/,'.<>?\s]/g, '').toLowerCase();
    return req;
};


/*
* User defined common function for the files
* Single and multiple both file 
*/

let createDimensions = async (path, fileName) => {
    return await Promise.all([
        Jimp.read(path+fileName)
        .then(lenna => {
            lenna.resize(310, 290)
            .write(`${path}/310x290/${fileName}`);
        }),

        Jimp.read(path+fileName)
        .then(lenna => {
            lenna.resize(350, 220)
            .write(`${path}/350x220/${fileName}`);
        })
    ])
}

let createFolders = (id, location) => {
    return new Promise( (resolve, reject) => {
        let pathFile = `${imagePath}`;
        if (location=='users' && !fs.existsSync(`${pathFile}temp/users/${id}`)) {
            fs.mkdirSync(`${pathFile}temp/users/${id}`);
            fs.mkdirSync(`${pathFile}temp/users/${id}/310x290`);
            fs.mkdirSync(`${pathFile}temp/users/${id}/350x220`);
        }
        if (location=='items' && !fs.existsSync(`${pathFile}temp/items/${id}/`)) {
            fs.mkdirSync(`${pathFile}temp/items/${id}`);
            fs.mkdirSync(`${pathFile}temp/items/${id}/310x290`);
            fs.mkdirSync(`${pathFile}temp/items/${id}/350x220`);
        }
        if (location=='packages' && !fs.existsSync(`${pathFile}temp/packages/${id}/`)) {
            fs.mkdirSync(`${pathFile}temp/packages/${id}`);
            fs.mkdirSync(`${pathFile}temp/packages/${id}/310x290`);
            fs.mkdirSync(`${pathFile}temp/packages/${id}/350x220`);
        }
        if (location=='categories' && !fs.existsSync(`${pathFile}temp/categories/${id}/`)) {
            fs.mkdirSync(`${pathFile}temp/categories/${id}`);
            fs.mkdirSync(`${pathFile}temp/categories/${id}/310x290`);
            fs.mkdirSync(`${pathFile}temp/categories/${id}/350x220`);
        }
        resolve(true);
    })
}


/*
* Remove uploaded image
*/
/* export const imageRemove = async (req, res, next) => {
    try {
        let filePath = req.body.filePath;
        let resultArray = [];
        filePath.forEach(async (path) => {
            fs.unlinkSync(path, function(error) {
                if (error) {
                    console.log(error);
                } else {
                    resultArray.push(result);
                }                
            });
        });
        res.json(successAction({
            fileName: resultArray
        }, Message.uploadSuccessfully));
    } catch (error) {
        res.json(failAction(error.message));
    }
}; */