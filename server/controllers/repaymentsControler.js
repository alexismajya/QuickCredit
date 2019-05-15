import config from'../config/config.json';
import myTok from 'jsonwebtoken';
import repaymentsMod from'../models/repayments';
import loansMod from'../models/loans';
import usersMod from'../models/users';
import validateRepayment from '../helpers/validateRepayment';
import moment from 'moment';

const repaymentsCont={
    getAllRepayments: (req, res) => {
         if (!repaymentsMod.allrepays.length) 
            return res.status(404).json({status: 404, error: 'No repayments(s) found' });

         return res.status(200).json({status:200, data: repaymentsMod.allrepays});
   },


    repayLoan: (req, res) => {
        // Validating 

        const { error } = validateRepayment.repayValidator(req.body);

        if (error) 
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70)});

           
                const loanTorepay = loansMod.loans.find(l => l.id === req.body.loanId && l.repaid!="true")

                if (!loanTorepay) 
                    return res.status(400).json({ status: 400, error: 'The specified unrepaid loan is not found !!' });
                
                let newrepayloan = repaymentsMod.repayments.find(nl => nl.loanId === req.body.loanId && nl.createdOn=== moment().format('LL'))

                if (newrepayloan) 
                    return res.status(400).json({ status: 400, error: 'This installment is already recorded' });
                      
                newrepayloan =repaymentsMod.repayLoan(req.body,res);
                    
                    
                const token=myTok.sign({ sub: newrepayloan.id }, config.secret);
                    res.status(201).json({status:201,message:"The loan repayment was successfully recorded", data: newrepayloan,token});
        
    },
    repaymentsHistory: (req, res) => {
        const myrepayments = repaymentsMod.repayments.find(l => l.loanId === req.params.loanId)

        if (!myrepayments) 
           return res.status(404).json({status: 404, error: 'No repayments for the loan  '+req.params.loanId+' found' });

        return res.status(200).json({status:200, data: myrepayments});
        
    },

    
}
export default repaymentsCont;

