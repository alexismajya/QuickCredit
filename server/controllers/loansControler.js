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

            const isloggedin=usersMod.users.find(u => u.email === req.body.user && u.isLoggedIn=="true" )
                if(!isloggedin)
                    return res.status(400).json({ status: 400, error: 'Dear client, you must loggin first to request a loan' });

                let newloan = loansMod.loans.find(l => l.user === req.body.user && l.repaid!="true")

                if (newloan) 
                    return res.status(400).json({ status: 400, error: 'Dear client, you have an unrepaid loan !!' });
                    
                newloan =loansMod.applyForLoan(req.body);
                    
                    
                const token=myTok.sign({ sub: newloan.id }, config.secret);
                    res.status(201).json({status:201,message:"The loan was successfully requested", data: newloan,token});
        
    },

    
}
export default loansCont;

