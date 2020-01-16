/*
 * @file: response.js
 * @description: It Contain function layer for api response status with data.
 * @author: Smartdata
 */

export const successAction = (data, message = 'OK') => {
    return ({status: 200, data, message});
}

export const failAction = (message = 'Failed') => {
    return ({status: 400, data: {}, message});
}

export const authFailAction = (message = 'Unauthorized') => {
    return ({status: 404, data: {}, message});
}