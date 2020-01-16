/*
 * @file: stripe.js
 * @description: It Contain function layer for stripe controller.
 * @author: Jasdeep Singh
 */

import {successAction, failAction} from '../utilities/response';
import {subscribePlan, addSubscription, upgradeDowngradePlan, couponInfo} from '../services/stripe';
import Message from '../utilities/messages';

/**************** Subscribe plan first time ***********/
export const planSubscribe = async (req, res, next) => {
    const payload = req.body;
    try{ 
    const data = await subscribePlan(payload);
        res.json(successAction(data, Message.success));
    } catch(error){
        res.json(failAction(error.message));
    }
  };
  /**************** Subscription adding if user exist ***********/
  export const subscriptionAdd = async (req, res, next) => {
    const payload = req.body;
    try { 
    const data = await addSubscription(payload);
        res.json(successAction(data, Message.success));
    } catch(error) {
        res.json(failAction(error.message));
    }
  };
   /********* Upgrade and downgrade subscription ***********/
  export const downgradeUpgradePlan = async (req, res, next) => {
    const payload = req.body;
    try { 
    const data = await upgradeDowngradePlan(payload);
        res.json(successAction(data, Message.success));
    } catch(error) {
        res.json(failAction(error.message));
    }
  };

    /********* Get coupon detail ***********/
    export const couponDetail = async (req, res, next) => {
        const payload = req.body;
        try { 
        const data = await couponInfo(payload.id);
            res.json(successAction(data, Message.success));
        } catch(error) {
            res.json(failAction(error.message));
        }
      };