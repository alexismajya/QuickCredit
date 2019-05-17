import config from'../config/config.json';
import myTok from 'jsonwebtoken';
import repaymentsMod from'../models/repayments';
import loansMod from'../models/loans';
import usersMod from'../models/users';
import validateRepayment from '../helpers/validateRepayment';
import moment from 'moment';

const repaymentsCont={
    getAllRepayments: (req, res) => {
         if (!repaymentsMod.allrepays) 
            return res.status(404).json({status: 404, error: 'No repayments(s) found' });

         return res.status(200).json({status:200, data: repaymentsMod.allrepays, message:"Data found"});
   },
    repayLoan: (req, res) => {
        // Validating 
        const { error } = validateRepayment.repayValidator(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70)});
        }
        else{
           
            const loanTorepay = loansMod.loans.find(l => l.id === req.query.loanId && l.repaid!="true")

             if (!loanTorepay) {
                return res.status(400).json({ status: 400, error: 'The specified unrepaid loan is not found !!' });
            }
            else{
                
                let newrepayloan = repaymentsMod.repayments.find(nl => nl.loanId === req.query.loanId);

                if (newrepayloan){ 
                     return res.status(400).json({ status: 400, error: 'This installment is already recorded' });
                }
                else{
                          
                     newrepayloan= repaymentsMod.repayLoan(req.body,re.query.loanId,res);
                        
                        res.status(201).json({status:201,message:"The loan repayment was successfully recorded", data: newrepayloan});
                }
            }
        }      
        
    },

    repaymentsHistory: (req, res) => {
        const myrepayments = repaymentsMod.repayments.find(l => l.loanId === req.query.loanId)

        if (!myrepayments) 
           return res.status(404).json({status: 404, error: 'No repayments history found' });

        return res.status(200).json({status:200, data: myrepayments,message:"data found"});

        
    },

    
}
export default repaymentsCont;

