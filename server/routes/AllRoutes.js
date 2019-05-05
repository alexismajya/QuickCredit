import express from'express';
var AllRoute = express.Router();


import user from'../controllers/usersControler';
import loan from'../controllers/loansControler';


AllRoute.get('/api/v1/users', user.getAllUsers);
AllRoute.post('/api/v1/auth/logIn', user.logIn);
AllRoute.post('/api/v1/auth/signup',user.signUp);
AllRoute.patch('/api/v1/users/:email',user.verifyUser);

AllRoute.get('/api/v1/loans', loan.getAllLoans);
AllRoute.post('/api/v1/loans/apply', loan.applyForLoan);



export default AllRoute;