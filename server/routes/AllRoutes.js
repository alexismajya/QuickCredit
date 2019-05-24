import express from'express';
var AllRoute = express.Router();

import access from '../middleware/userAuth';
import user from'../controllers/usersControler';
import loan from'../controllers/loansControler';
import repay from'../controllers/repaymentsControler';


AllRoute.get('/api/v1/users',access, user.getAllUsers);
AllRoute.post('/api/v1/auth/signin', user.logIn);
AllRoute.post('/api/v1/auth/signup',user.signUp);
AllRoute.patch('/api/v1/users/:userEmail/verify',access,user.verifyUser);

AllRoute.get('/api/v1/loans',access, loan.getAllLoans);
AllRoute.get('/api/v1/loans/:loanId', loan.specific);

AllRoute.post('/api/v1/loans', loan.applyForLoan);
AllRoute.patch('/api/v1/loans/:loanId',access,loan.approveLoan);

AllRoute.post('/api/v1/loans/:loanId/repayment',access, repay.repayLoan);
AllRoute.get('/api/v1/repayments',access, repay.getAllRepayments);
AllRoute.get('/api/v1/loans/:loanId/repayments', repay.repaymentsHistory);


export default AllRoute;