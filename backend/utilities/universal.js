/*
 * @file: universal.js
 * @description: It Contain function layer for all commom function.
 * @author: Smartdata
 */

import md5 from 'md5';
import jwt from 'jsonwebtoken';
import User from '../collections/user';
import Messages from './messages';
import env from '../env/index'
import { authFailAction } from './response';
import { USER_TYPE_USER, USER_TYPE_VENDOR, USER_TYPE_ADMIN} from '../utilities/constants';
/* Get timestamp */
export const getTimeStamp = () => {
  return Date.now();
};
const sectetKey = env.sectetKey;
const sessionExpTime = env.sessionExpTime;

/* password encryption */
export const encryptpassword = (password) => {
  return md5(password);
};

/* Generate random strings */
export const generateRandom = (length = 32, alphanumeric = true) => {
  let data = '',
    keys = '';
  if (alphanumeric) {
    keys = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  } else {
    keys = '0123456789';
  }
  for (let i = 0; i < length; i++) {
    data += keys.charAt(Math.floor(Math.random() * keys.length));
  }
  return data;
};

/* Generate Token */
export const generateToken = data => jwt.sign(data, sectetKey , { expiresIn: sessionExpTime });

/* Decode Token */
export const decodeToken = token => jwt.verify(token, sectetKey );

/*Authorization verify*/
export const authorization = async (req, res, next) => {
  const token = req.headers['authorization'];
  let decoded = {};
  try {
    decoded = jwt.verify(token, sectetKey);
  } catch (err) {
    res.send(authFailAction(Messages.tokenExpired));
}

  /* logger.info('authorization', decoded); */
  const data = await User.checkToken(token);
  if (data && data.role == USER_TYPE_ADMIN) {
    let user = data.toObject()
    user['token'] = token;
    delete user['loginToken'];
    delete user['password'];
    req['user'] = user;
    next();
  } else {
    res.send(authFailAction(Messages.unauthorizedUser));
  }
};

/*Authorization verify*/
export const authorizationVendor = async (req, res, next) => {
  const token = req.headers['authorization'];
  let decoded = {};
  try {
    decoded = jwt.verify(token, sectetKey);
  } catch (err) {
    res.send(authFailAction(Messages.tokenExpired));
  }

  /* logger.info('authorization', decoded); */
  const data = await User.checkToken(token);
  if (data && data.role == USER_TYPE_VENDOR) {
    let user = data.toObject()
    user['token'] = token;
    delete user['loginToken'];
    delete user['password'];
    req['user'] = user;
    next();
  } else {
    res.send(authFailAction(Messages.unauthorizedUser));
  }
};

/*Authorization verify*/
export const authorizationBoth = async (req, res, next) => {
  const token = req.headers['authorization'];
  let decoded = {};
  try {
    decoded = jwt.verify(token, sectetKey);
  } catch (err) {
    res.send(authFailAction(Messages.tokenExpired));
  }

  /* logger.info('authorization', decoded); */
  const data = await User.checkToken(token);
  if (data && (data.role == USER_TYPE_VENDOR || data.role == USER_TYPE_ADMIN)) {
    let user = data.toObject()
    user['token'] = token;
    delete user['loginToken'];
    delete user['password'];
    req['user'] = user;
    next();
  } else {
    res.send(authFailAction(Messages.unauthorizedUser));
  }
};


/* Authorization for all vendor, customer and admin */
export const authorizationCommon = async (req, res, next) => {
  const token = req.headers['authorization'];
  let decoded = {};
  try {
    decoded = jwt.verify(token, sectetKey);
  } catch (err) {
    res.send(authFailAction(Messages.tokenExpired));
  }

  /* logger.info('authorization', decoded); */
  const data = await User.checkToken(token);
  if (data && (data.role == USER_TYPE_USER || data.role == USER_TYPE_VENDOR || data.role == USER_TYPE_ADMIN)) {
    let user = data.toObject()
    user['token'] = token;
    delete user['loginToken'];
    delete user['password'];
    req['user'] = user;
    next();
  } else {
    res.send(authFailAction(Messages.unauthorizedUser));
  }
};

