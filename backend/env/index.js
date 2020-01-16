/*
 * @file: index.js
 * @description: It Contain environment variables.
 * @author: smartData
 */

const local = {
    STRIPE_PRIVATE_KEY : "sk_test_key", 
    databaseUrl :'mongodb://localhost:27017/VNDR',
    sectetKey :'VNDR123!@#',
    sessionExpTime :'1d',
    frontendUrl :'http://localhost:4200/'
    
};
const production = {
    STRIPE_PRIVATE_KEY : "sk_test_key", 
    databaseUrl: 'mongodb://admin:admin123@18.190.55.136:27017/VNDR',
    sectetKey :'VNDR123!@#',
    sessionExpTime :'1d',
    frontendUrl :'http://18.190.55.136/'
};

if (process.env.NODE_ENV === 'production') {
  module.exports = production;
} else {
  module.exports = local;
}