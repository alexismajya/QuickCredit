import config from'../config/config.json';
import myTok from 'jsonwebtoken';
import loansMod from'../models/loans';///
import usersMod from'../models/users';///
import validateLoan from '../helpers/validateLoan';
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
let loanData=[];

class LoansController{
    constructor(){
            this.loansController= [];

    }
    async getAllLoans(req,res){
        await client.query('select * from loans')
            .catch(e=>console.log(e))
            .then(result=> {
                if(!result.rows){
                    return res.status(404).json({status: 404, error: 'No loan(s) found' });
                }
                else{
                    loanData=result.rows;
                    return res.status(200).json({message:"Data found", status:200, data: result.rows});
                }
            })
            
     }

    async applyForLoan (req, res){
        // Validating 

        const { error } = validateLoan.applyValidator(req.body);

        if (error) 
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70)});

        let requestor ="";
        const txt= `select * from myusers where email=$1 and status='verified'`;
        const val=[req.body.user];
        
        client.query(txt,val)

            .then(requestor=>{ 
               if (!requestor.rows.length){ 
                    return res.status(400).json({ status: 400, error: 'Not allowed. We are not recognize you as trusted user.' });
                }
                else if(requestor.rows.length){

                    let hascurrentloan ="";
                    const txtloan= `select * from loans where email=$1 and repaid='false'`;
                    const valloan=[req.body.user];

                    client.query(txtloan,valloan)

                        .then(loan=>{ 
                           if (loan.rows.length){ 
                                return res.status(400).json({ status: 400, error: 'This account has an unrepaid loan' });
                            }
                            else{
                                const txtapply= `insert into loans(email,createdOn,status,repaid,tenor,amount,interest,paymentInstallment,balance) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
                                const valapply=[req.body.user, moment().format('LL'),'pending','false', parseInt(req.body.tenor), parseInt(req.body.amount), parseInt(req.body.amount)*5/100,(parseInt(req.body.amount)+parseInt(req.body.amount)*5/100)/parseInt(req.body.tenor), parseInt(req.body.amount)+parseInt(req.body.amount)*5/100];

                                client.query(txtapply,valapply)

                                    .then(request=>{

                                        res.status(201).json({status:201,message:"The loan was successfully requested", data: request.rows[0]});
                                     })

                            }
                        })
                        .catch(e=>console.log(e))
  
                } 
            })
            .catch(e=>console.log(e))        
    }

    async approveLoan(req,res){

        //validate data

        const { error } = validateLoan.approveValidator(req.body);
        if (error) 
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70) });

        const txt= `select * from loans where id=$1 and status='pending'`;
        const val=[req.params.loanId];
                
        client.query(txt,val)

            .then(requestor=>{ 
                if (!requestor.rows.length){ 
                    return res.status(400).json({ status: 400, error: 'The specified user does not have a pending loan request' });
                }
                else{
                    const txtupdate= `update loans set status=$1 where id=$2`;
                    const valupdate=[req.body.status,parseInt(req.params.loanId)];

                    client.query(txtupdate,valupdate)

                        .then(approve=>{

                            res.status(201).json({status:201,message:"The loan was successfully "+req.body.status, data: approve.rows[0]});
                        })
                    }
                })
                .catch(e=>console.log(e)) 
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
const loans = new LoansController;
export default loans;

