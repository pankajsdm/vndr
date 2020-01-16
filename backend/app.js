/*
* @file: app.js
* @description: The backbone file of the applciation.
* @author: Smartdata
*/

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload  from 'express-fileupload';

/* import path from 'path'; */
import  router from './routers/index';
import env from './env/index'
import path from 'path';
const fs = require('fs-extra');
import expressValidation from 'express-validation';
/* Swagger jsdoc and ui import file */
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import SocketService from './socket/socketService';

const imagePath = './public/uploads/images/';
const app = express();
const PORT = process.env.PORT || 4598;
const databaseUrl = env.databaseUrl

/* Configuration of swagger */
const swaggerDefinition = {
    info: {
        title: 'VNDR WEB API ENDPOINTS',
        //version: '1.0.0',
       /*  description: 'Define projects ndpoints for the various routers. It may include Admin, Vendor and Customer routes. Parameter and other neccessary fiels is defined according to the documentation. For better understanding, Please refer the documentation here https://swagger.io/tools/swaggerhub/. ', */
        
    },
    host: `localhost:${PORT}`,
    basePath: '/api/v1'
};
  
const options = {
    swaggerDefinition,
    apis: ['./routers/swagger/*.js'],
    layout: "AugmentingLayout"
};
const swaggerSpec = swaggerJSDoc(options);

const swaggerOptions = {  
    customSiteTitle: 'My Service',  
  }; 
  
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
/* End swagger configuration */

/* Define app use modules */
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use('/api/v1/', router);
app.use(express.static(path.join(__dirname, 'public/uploads/images')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
app.use(express.static(path.join(__dirname, 'public/dist')));

app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
      res.status(err.status).json(err);
    } else {
      res.status(500)
        .json({
          status: err.status,
          message: err.message
        });
    }
  });

/* Run dist folder here  */
app.get('/*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/dist', 'index.html'))
});
/* Initialized database connection  */
mongoose.connect(databaseUrl, {useNewUrlParser: true});
 
/* Make temp directory */ 
makeFolders();



/* Listening application of defined port  */
const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});


/* Configure socket implementation */
let socketIO = require('socket.io');
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log('socket user connected');
    new SocketService(socket, io);
});



/*
* Creating required temp directory
* In order to add and remove images
*/
function makeFolders(){
  let pathFile = `${imagePath}`;
  if (!fs.existsSync(`${pathFile}temp`)) {
      fs.mkdirSync(`${pathFile}temp`);
  }
  if (!fs.existsSync(`${pathFile}temp/users`)) {
      fs.mkdirSync(`${pathFile}temp/users`);
  }
  if (!fs.existsSync(`${pathFile}temp/items`)) {
      fs.mkdirSync(`${pathFile}temp/items`);
  }
  if (!fs.existsSync(`${pathFile}temp/packages`)) {
      fs.mkdirSync(`${pathFile}temp/packages`);
  }
  if (!fs.existsSync(`${pathFile}temp/categories`)) {
      fs.mkdirSync(`${pathFile}temp/categories`);
  }
}


