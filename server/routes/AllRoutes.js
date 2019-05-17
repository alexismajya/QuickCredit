import express from'express';
var AllRoute = express.Router();


import user from'../controllers/usersControler';
import loan from'../controllers/loansControler';
import repay from'../controllers/repaymentsControler';


AllRoute.get('/api/v1/users', user.getAllUsers);
AllRoute.post('/api/v1/auth/signin', user.logIn);
AllRoute.post('/api/v1/auth/signup',user.signUp);
AllRoute.patch('/api/v1/users/:userEmail/verify',user.verifyUser);

AllRoute.get('/api/v1/loans', loan.getAllLoans);
AllRoute.get('/api/v1/loans/:loanId', loan.specific);

AllRoute.post('/api/v1/loans', loan.applyForLoan);
AllRoute.patch('/api/v1/loans/:loanId',loan.approveLoan);

AllRoute.get('/api/v1/loans?status=approved&repaid=false',loan.notPaid)
AllRoute.get('/api/v1/loans?status=approved&repaid=true',loan.paid);


AllRoute.post('/api/v1/loans/:loanId/repayment', repay.repayLoan);
AllRoute.get('/api/v1/repayments', repay.getAllRepayments);
AllRoute.get('/api/v1/loans/:loanId/repayments', repay.repaymentsHistory);


export default AllRoute;