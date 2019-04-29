const expressJwt = require('express-jwt');
const config = require('../config/config.json');

module.exports = myTok;

const myTok=()=>{
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path: [
            './server/tests/'
        ]
    });
}