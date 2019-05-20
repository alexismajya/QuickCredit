import config from'../config/config.json';
import myTok from 'jsonwebtoken';
import loansMod from'../models/loans';
import usersMod from'../models/users';
import validateLoan from '../helpers/validateLoan';

class LoansControler{
    getAllLoans (req, res){
         if (!loansMod.loans.length) 
            return res.status(404).json({status: 404, error: 'No loan(s) found' });

         return res.status(200).json({status:200, data: loansMod.loans, message:"Data found"});
   }

    applyForLoan (req, res){
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
                    
                    res.status(201).json({status:201,message:"The loan was successfully requested", data: newloan});
        
    }

    approveLoan(req,res){

        //validate data

        const { error } = validateLoan.approveValidator(req.body);
        if (error) 
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70) });

        //const isloggedAsAdmin=usersMod.users.find(u => u.email === req.body.approvedBy && u.isLoggedIn==="true" && u.isAdmin==="true")
               // if(!isloggedAsAdmin)
                   // return res.status(400).json({ status: 400, error: 'You are not allowed to approve the loan request. Log in as Admin' });


         let userrequest = loansMod.loans.find(l => l.id === parseInt(req.params.loanId) && l.status==="pending");
        if (!userrequest) 
            return res.status(404).json({ status: 404, error: 'The specified user does not have a pending loan request' });

        
            userrequest.status=req.body.status;


            res.status(200).json({status:200,message:"The loan request done successfully", data:userrequest });

    }
    notPaid(req,res){

        
         const notepaid = loansMod.loans.filter(notl => l.status ===req.querry.status && notl.repaid.toString()===req.querry.repaid && req.querry.repaid==='false' &&req.querry.status==='approved');
        if (notepaid.length!==0) {
             res.status(200).json({status:200,message:"Data found", data:notepaid });
        }
        else{
            return res.status(404).json({ status: 404, error:"no data found" });
        }

    }
    paid(req,res){

         const paidl = loansMod.loans.filter(l => l.status ===req.querry.status && l.repaid.toString()===req.querry.repaid && req.querry.repaid==='true' &&req.querry.status==='approved');
        if (paidl.length!==0){
            res.status(200).json({status:200,message:"Data found", data:paidl });
        } 
        else{
           return res.status(404).json({ status: 404, error:"no data found" }); 
        }
              

    }
    specific(req,res){

         let spes = loansMod.loans.find(l => l.id ===parseInt(req.params.loanId));
        if (!spes) 
            return res.status(404).json({ status: 404, error:"no data found" });

        res.status(200).json({status:200,message:"Data found", data:spes });

    }
         
}
const loans = new LoansControler;
export default loans;

