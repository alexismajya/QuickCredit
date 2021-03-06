import config from'../config/config.json';
import myTok from 'jsonwebtoken';
import repaymentsMod from'../models/repayments';
import loansMod from'../models/loans';
import usersMod from'../models/users';
import validateRepayment from '../helpers/validateRepayment';
import moment from 'moment';

const {Client}=require ('pg');
// const client=new Client({
//        user:"postgres",
//        host :"localhost",
//        password:"Alexism1!?",
//        port:"5432",
//        database:"quickdb"

// })
const client=new Client(process.env.DATABASE_URL);
client.connect()

class RepaymentsController{

    constructor(){
            this.repaymentsController= [];

    }
    getAllRepayments(req,res){
        client.query('select * from repayments')
            
            .then(result=> {
                if(!result.rows.length){
                    return res.status(404).json({status: 404, error: 'No repayments(s) found' });
                }
                else{
                    return res.status(200).json({message:"Data found", status:200, data: result.rows});
                }
            })
            .catch(e=>console.log(e))
            
     }

    repayLoan(req, res){
        
        // Validating 
        const { error } = validateRepayment.repayValidator(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70)});
        }
        else{

            const txtloan= `select * from loans where id=$1 and repaid='false'`;
            const valloan=[parseInt(req.params.loanId)];

            client.query(txtloan,valloan)

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

        const txtreturnhist= `Select * from repayments where loanId=$1`;
        const valreturnhist=[parseInt(req.params.loanId)];

        client.query(txtreturnhist,valreturnhist)

            .then(result=>{
                if (!result.rows.length){ 
                    return res.status(404).json({ status: 404, error: 'No data found' });
                }

                res.status(200).json({status:200,message:"Data found", data:result.rows });
            })
            .catch(e=>console.log(e)) 
        
    }
    
}
const repaymentsCont = new RepaymentsController;
export default repaymentsCont;


