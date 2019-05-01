import  expressJwt from 'express-jwt';
import config from'../config/config.json';

module.exports = myTok;

const myTok=()=>{
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path: [
            './server/tests/'
        ]
    });
}