import config from'../config/config.json';
import myTok from 'jsonwebtoken';
import loansMod from'../models/loans';
import usersMod from'../models/users';
import validateLoan from '../helpers/validateLoan';

const loansCont={
    getAllLoans: (req, res) => {
         if (!loansMod.loans.length) 
            return res.status(404).json({status: 404, error: 'No loan(s) found' });

         return res.status(200).json({status:200, data: loansMod.loans});
   },


    applyForLoan: (req, res) => {
        // Validating 

        const { error } = validateLoan.applyValidator(req.body);

        if (error) 
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70)});

            const isloggedin=usersMod.users.find(u => u.email === req.body.user && u.isLoggedIn==="true" && u.isAdmin==="false" )
                if(!isloggedin)
                    return res.status(400).json({ status: 400, error: 'Dear client, you must login first to request a loan' });

            const isVerified=usersMod.users.find(u => u.email === req.body.user && u.status==="verified" )
                if(!isVerified)
                    return res.status(400).json({ status: 400, error: 'Dear client, you are not allowed to request a loan, your account is not verified' });

                let newloan = loansMod.loans.find(l => l.user === req.body.user && l.repaid!="true")

                if (newloan) 
                    return res.status(400).json({ status: 400, error: 'Dear client, you have an unrepaid loan !!' });
                    
                newloan =loansMod.applyForLoan(req.body);
                    
                    
                const token=myTok.sign({ sub: newloan.id }, config.secret);
                    res.status(201).json({status:201,message:"The loan was successfully requested", data: newloan,token});
        
    },

    approveLoan:(req,res)=>{

        //validate data

        const { error } = validateLoan.approveValidator(req.body);
        if (error) 
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70) });


        const isloggedAsAdmin=usersMod.users.find(u => u.email === req.body.approvedBy && u.isLoggedIn==="true" && u.isAdmin==="true")
                if(!isloggedAsAdmin)
                    return res.status(400).json({ status: 400, error: 'You are not allowed to approve the loan request. Log in as Admin' });


         let userrequest = loansMod.loans.find(l => l.user === req.params.user && l.status==="pending");
        if (!userrequest) 
            return res.status(404).json({ status: 404, error: 'The specified user does not have a pending loan request' });

        
       userrequest.status=req.body.status;


        //return update

        userrequest=loansMod.loans.find(l => l.user === req.params.user);

        const token=myTok.sign({ sub: userrequest.id }, config.secret);
            res.status(200).json({status:200,message:"User marked as verified", data:userrequest,token });

    },
     loansListByStatus: (req, res) => {

       const rejectedloan = loansMod.loans.find(l => l.status === req.params.status)

         if (!rejectedloan) 
            return res.status(404).json({status: 404, error: 'No '+req.params.status+' loan(s) found' });

         return res.status(200).json({status:200, data: rejectedloan});
   },
   arePaidLoans: (req, res) => {

       const paidloan = loansMod.loans.find(l => l.repaid === req.params.repaid)

         if (!paidloan) 
            return res.status(404).json({status: 404, error: 'No data found' });

         return res.status(200).json({status:200, data: paidloan});
   },


    
}
export default loansCont;

