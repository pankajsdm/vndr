/*
 * @file: stripe.js
 * @description: It Contain function layer for stripe service.
 * @author: Manpreet Singh
 */

import Stripe from 'stripe';
import {STRIPE_PRIVATE_KEY} from '../utilities/constants';
const stripe = new Stripe(STRIPE_PRIVATE_KEY);

/********* Add Plan (Subscribe plan) ***********/
export const subscribePlan = async payload => {
    const customer = await stripe.customers.create({
      description: `Customer for ${payload.email}`,
      email: payload.email,
      source: payload.source
    });
    // await stripe.invoices.create({
    //   customer: customer.id
    // });
    if (customer) {
      let object = {
        customer: customer.id,
        items: [
          {
            plan: payload.plan,
          },
        ],
        collection_method: 'charge_automatically'
      };  
      if(payload['coupon']){
        object = {...object, coupon: payload['coupon']};
      }
      const subscription = await stripe.subscriptions.create(object);
      if (subscription) {
        const obj = {
          customerId: customer.id,
          subscriptionId: subscription.id,
          plan: { name: payload.plan, amount: (subscription.plan.amount) / 100, currency: subscription.plan.currency },
          current_period_start: subscription.current_period_start,
          current_period_end: subscription.current_period_end,
          sources: [
            {
              ...payload.card
            }
          ]
        };        
        return obj;
      }
    }
  };
  /********* Add Subscription if user already created ***********/
  export const addSubscription = async payload => {
    const customer = await stripe.customers.update(payload.customerId, {
      source: payload.source,
    });
    // await stripe.invoices.create({
    //   customer: payload.customerId
    // });
    if (customer) {
      let object = {
        customer: payload.customerId,
        items: [
          {
            plan: payload.planId,
          },
        ],
        collection_method: 'charge_automatically'
      };  
      if(payload['coupon']){
        object = {...object, coupon: payload['coupon']};
      }
      const subscription = await stripe.subscriptions.create(object);
      if (subscription) {
        const obj = {
          customerId: payload.customerId,
          subscriptionId: subscription.id,
          plan: { name: payload.plan, amount: (subscription.plan.amount) / 100, currency: subscription.plan.currency },
          current_period_start: subscription.current_period_start,
          current_period_end: subscription.current_period_end,
          sources: [
            {
              ...payload.card
            }
          ]
        };
        return obj;
      }
    }
  };
  /********* Get all plans list ***********/
  export const planList = async (user) => {
    return await stripe.plans.list({ limit: 5 });    
  };
 
  /********* Upgrade and downgrade subscription ***********/
  export const upgradeDowngradePlan = async payload => {
    // https://stripe.com/docs/billing/subscriptions/upgrading-downgrading
    const oldSubscription = await stripe.subscriptions.retrieve(payload.subscriptionId);
    /******************* Upgrade/Downgrade subscription *****************/
    const subscription = await stripe.subscriptions.update(
      payload.subscriptionId,
      {
        items: [{
          id: oldSubscription.items.data[0].id,
          plan: payload.planId,
        }]
      });
    if (subscription) {
        return ({
        plan: { name: payload.planId, amount: (subscription.plan.amount) / 100, currency: subscription.plan.currency },
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
      });
    }
  };
  /********* Cancel Subscription ***********/
  export const deleteSubscription = async payload => {
    return await stripe.subscriptions.del(payload.subscriptionId);
  };
  /*********** Add subscription plan ************/
  export const addSubscriptionPlan = async payload => {
    return await stripe.plans.create({
      amount: payload.amount,
      interval: payload.interval,
      product: {
        name: payload.name
      },
      currency: 'usd',
    });
  };
  
  /*********** Delete subscription plan ************/
  export const deleteSubscriptionPlan = async payload => {
    return await stripe.plans.del(payload.plan_id);
  };

  /*********** Get coupon code detail by id **************/
  export const couponInfo = async id => {
    return await stripe.coupons.retrieve(id);
  }