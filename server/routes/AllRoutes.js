import express from'express';
var AllRoute = express.Router();


import user from'../controllers/usersControler';


AllRoute.get('/api/v1/users', user.getAllUsers);
AllRoute.post('/api/v1/auth/logIn', user.logIn);
AllRoute.post('/api/v1/auth/signup',user.signUp);


export default AllRoute;