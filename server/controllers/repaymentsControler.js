import config from'../config/config.json';
import myTok from 'jsonwebtoken';
import repaymentsMod from'../models/repayments';
import loansMod from'../models/loans';
import usersMod from'../models/users';
import validateRepayment from '../helpers/validateRepayment';
import moment from 'moment';

const {Client}=require ('pg');
const client=new Client({
       user:"postgres",
       host :"localhost",
       password:"Alexism1!?",
       port:"5432",
       database:"quickDB"

})
client.connect()

class RepaymentsController{

    constructor(){
            this.repaymentsController= [];

    }
    async getAllRepayments(req,res){
        await client.query('select * from repayments')
            
            .then(result=> {
                if(!result.length){
                    return res.status(404).json({status: 404, error: 'No repayments(s) found' });
                }
                else{
                    return res.status(200).json({message:"Data found", status:200, data: result.rows});
                }
            })
            .catch(e=>console.log(e))
            
     }

    async repayLoan(req, res){
        
        // Validating 
        const { error } = validateRepayment.repayValidator(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70)});
        }
        else{

            const txtloan= `select * from loans where id=$1 and repaid='false'`;
            const valloan=[parseInt(req.params.loanId)];

            await client.query(txtloan,valloan)

                .then(loan=>{ 
                    if (!loan.rows.length){ 
                        return res.status(400).json({ status: 400, error: 'The specified unrepaid loan is not found !!' });
                    }
                    else{
                        const txtrepay= `insert into repayments(createdOn,loanId,amount) values($1,$2,$3) RETURNING *`;
                        const valrepay=[moment().format('LL'), parseInt(req.params.loanId), parseInt(req.body.amount)];

                        
                        const txtupdatebalance= `update loans set balance=balance-$1 where id=$2`;
                        const valupdatebalance=[parseInt(req.body.amount),parseInt(req.params.loanId)];
                        
                        client.query(txtrepay,valrepay)

                            .then(request=>{

                                client.query(txtupdatebalance,valupdatebalance)

                                res.status(201).json({status:201,message:"The repayment was posted successfully", data: request.rows[0]});
                            })
                    }
                })
                .catch(e=>console.log(e))    
        }     
    }
    repaymentsHistory(req, res){
        const myrepayments = repaymentsMod.repayments.find(l => l.loanId === parseInt(req.params.loanId));

        if (!myrepayments) 
           return res.status(404).json({status: 404, error: 'No repayments history found' });

        return res.status(200).json({status:200, data: myrepayments,message:"data found"});

        
    }
    
}
const repaymentsCont = new RepaymentsController;
export default repaymentsCont;


