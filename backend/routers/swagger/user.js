
/**
 * @swagger
 * /user/login:
 *   post:
*     description: | 
*       The service will offer a status endpoint which can be accessed via a HTTP GET request. 
*       It will return a status 200 if user exist according to the cred of login
*     tags: 
*       - User 
    *     produces:
    *       - application/json
    *     consumes:
    *       - application/json
    *     parameters:
    *       - name: body
    *         in: body
    *         schema:
    *           properties:
    *             email:
    *               type: string
    *             password:
    *               type: string
    *               format: password
    *             role:
    *               type: number
    *               defaut: 3
    *         required:
    *           - username
    *           - password
    *           - role
    *     responses:
    *       '200':
    *         description: User logged in successfully
    *       '400':
    *         description: Email id or password not correct
    *       '403':
    *         description: email and password are not matched
*/




/**
 * @swagger
 * /user/register:
 *   post:
*     description: | 
*       The service will offer a status endpoint which can be accessed via a HTTP GET request. 
*       Service to create a new user
*     tags: 
*       - User 
    *     produces:
    *       - application/json
    *     consumes:
    *       - application/json
    *     parameters:
    *       - name: body
    *         in: body
    *         schema:
    *           properties:
    *             name:
    *               type: string
    *             email:
    *               type: string
    *             password:
    *               type: string
    *               format: password
    *             role:
    *               type: number
    *               defaut: 3
    *         required:
    *           - name
    *           - email
    *           - password
    *     responses:
    *       '200':
    *         message: Successfully registered
    *       '400':
    *         description: This Email is already registered

*/




/** 
 * 
    * /api/v1/getUser/id: 
    *   get: 
    *     description: | 
    *       The service will offer a status endpoint which can be accessed via a HTTP GET request. 
    *       It will return a status 200 and a body message if the service is in a good state. 
    *     tags: 
    *       - User 
    *     produces: 
    *       - application/json 
    *     parameters:
    *       - name: uri
    *         in: uri
    *         schema:
    *           properties:
    *             user_id:
    *               type: string
    *         required:
    *           - user_id
    *     responses:
    *       '200':
    *         message: Logged in successfully
    *       '400':
    *         message: Email id or password not correct
*/
