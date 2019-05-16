import express from'express';
var AllRoute = express.Router();


import user from'../controllers/usersControler';
import loan from'../controllers/loansControler';
import repay from'../controllers/repaymentsControler';


AllRoute.get('/api/v1/users', user.getAllUsers);
AllRoute.post('/api/v1/auth/signin', user.logIn);
AllRoute.post('/api/v1/auth/signup',user.signUp);
//AllRoute.patch('/api/v1/users/:email',user.verifyUser);
AllRoute.patch('/api/v1/users/:<userEmail>/verify',user.verifyUser);

AllRoute.get('/api/v1/loans', loan.getAllLoans);//ok
//AllRoute.get('/api/v1/loans/<:loan-id>', loan.getAllLoans);

AllRoute.post('/api/v1/loans/apply', loan.applyForLoan);
//AllRoute.post('/api/v1/loans', loan.applyForLoan);
AllRoute.patch('/api/v1/loans/:user',loan.approveLoan);
//AllRoute.patch('/api/v1/loans/<:loan-id>',loan.approveLoan);

AllRoute.get('/api/v1/loans/pending-rejected-approved/:status',loan.loansListByStatus);
//AllRoute.get('/api/v1/loans?status=approved&repaid=false',loan.loansListByStatus)
AllRoute.get('/api/v1/loans/Current-Paid-Loans/:repaid',loan.arePaidLoans);
//AllRoute.get('/api/v1/loans?status=approved&repaid=true',loan.arePaidLoans);

AllRoute.post('/api/v1/repayments/repayLoan', repay.repayLoan);
//AllRoute.post('/api/v1/loans/<:loan-id>/repayment', repay.repayLoan);
AllRoute.get('/api/v1/repayments', repay.getAllRepayments);
AllRoute.get('/api/v1/repayments/History/:loanId', repay.repaymentsHistory);
//AllRoute.get('/api/v1/loans/<:loan-id>/repayments', repay.repaymentsHistory);


export default AllRoute;