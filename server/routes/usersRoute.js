import express from'express';
var registerRoute = express.Router();


import {getAllUsers,signUp,findUser} from'../controllers/usersControler';


registerRoute.get('/api/v1/users', getAllUsers);
registerRoute.get('/api/v1/users/:id', findUser);
registerRoute.post('/api/v1/auth/signup',signUp);


module.exports = registerRoute;