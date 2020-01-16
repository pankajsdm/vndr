/*
 * @file: index.js
 * @description: It Contain function layer for user collection.
 * @author: Manpreet Singh
 */

import mongoose from 'mongoose';
import userSchema from './db-schema';

class UserClass {
  
  static checkEmail(email) {
    return this.findOne({ email });
  }
  static checkToken(token) {
    return this.findOne({ 'loginToken.token': token });
  }
  static saveUser(payload) {
    return this(payload).save();
  }
  static login(email, password) {
    return this.findOne({
      email,
      password,
      isDeleted:false
    });
  }

  static findone(query) {
    return this.findOne(query);
  }

  static onLoginDone(userId, loginToken) {
    let updateData = {
      $push: { loginToken: { token: loginToken } },
      $set: {
        lastLogin: Date.now(),
        updatedAt: Date.now()
      }
    };
    return this.findByIdAndUpdate(userId, updateData, { new: true });
  }
  
  static logout(userId, token) {
    let updateData = {
      $set: {
        updatedAt: Date.now()
      },
      $pull: { loginToken: { token } }
    };
    return this.findByIdAndUpdate(userId, updateData);
  }
}

userSchema.loadClass(UserClass);

export default mongoose.model('User', userSchema);