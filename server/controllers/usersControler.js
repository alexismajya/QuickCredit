import config from'../config/config.json';
import myTok from 'jsonwebtoken';
import usersMod from'../models/users';
import bcrypt from'bcrypt';
import validateUser from '../helpers/validateUser';

const {Client}=require ('pg');
const client=new Client({
       user:"postgres",
       host :"localhost",
       password:"Alexism1!?",
       port:"5432",
       database:"quickDB"

})
client.connect()
let uData=[];

class UsersController{
   constructor(){
        this.usersController= [];

    }
    async getAllUsers(req,res){
        await client.query('select * from myusers')
            .catch(e=>console.log(e))
            .then(result=> {
                if(result.rows.count==0){
                    return res.status(404).json({status: 404, error: 'No user(s) found' });
                }
                else{
                    uData=result.rows;
                    return res.status(200).json({status:200, data: result.rows});
                }
            })
            
     }

    async signUp(req, res){
        // Validating 

        const { error } = validateUser.UserSignupValidator(req.body,res);

        if (error) 
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70)});

            let legisteruser = uData.find(u => u.email === req.body.email)

            if (legisteruser) 
                return res.status(400).json({ status: 400, error: 'This email already registered !!' });

            let stat="unverified"
            if(req.body.isAdmin=="true"){
            stat="verified"
             }
        
            const values = [req.body.email ,req.body.firstname, req.body.lastname, bcrypt.hashSync(req.body.password,5), req.body.address,stat, req.body.isadmin];
            const quer=`insert into myusers(email,firstname,lastname,password,address,status,isadmin) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
            
             await client.query(quer,values)
                .catch(e=>console.log(e))
                .then(result=>{   
                    const token=myTok.sign({ sub: result.rows[0].id }, config.secret);
                    const dataRet={
                        token: token,
                        id:result.rows[0].id,
                        email:result.rows[0].email,
                        firstname:result.rows[0].firstname,
                        lastname:result.rows[0].lastname,
                        address:result.rows[0].address,
                        status:result.rows[0].status,
                    } 
                 
                res.header('Authorization',token).status(201).json({status:201,message:"Successfully registered", data: dataRet});             
                  

                });     
        
    }

    async logIn(req, res){
        // Validating 
        const { error } = validateUser.UserLoginValidator(req.body);
        if (error) 
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70) });

        // Check email
        let loggeduser ="";
        const txt= `select * from myusers where email=$1`;
        const val=[req.body.email];
        
        await client.query(txt,val)

            
            .then(result=>{ 
               if (!result.rows.length){ 
                    return res.status(400).json({ status: 400, error: 'Email and/or password is incorrect' });
                }
                else if(result.rows.length){

                    const comparePass = bcrypt.compareSync(req.body.password, result.rows[0].password);
                    
                    if (!comparePass){ 
                    return res.status(400).json({ status: 400, error: 'Email and/or password is incorrect' });
                    }
                 
                    else{
                        const token=myTok.sign({ sub: result.rows[0].id }, config.secret);
                        const dataRet={
                        token: token,
                        id:result.rows[0].id,
                        email:result.rows[0].email,
                        firstname:result.rows[0].firstname,
                        lastname:result.rows[0].lastname,
                    } 
                    res.status(200).json({status:200,message:"Logged In Successfully", data: dataRet});
                 }
             } 
            })
            .catch(e=>console.log(e))
            
    }

    async verifyUser(req,res,next){

             //validate data
        const { error } = validateUser.verifyUserValidator(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70) });
        } 

          // Check if user exists
        let existUser ="";
        const txt= `select * from myusers where email=$1`;
        const val=[req.params.userEmail];

        let updateUser ="";
        const txtUpdate= `UPDATE myusers set status=$1 where email=$2`;
        const valUpdate=[req.body.status, req.params.userEmail];
        
        await client.query(txt,val)
            .then(result=>{ 
               if (!result.rows.length){ 
                return res.status(404).json({ status: 404, error: 'The user does not  exist' });
               }
               else{
                    if (result.rows[0].status==="verified") {
                        return res.status(400).json({ status: 400, error: 'The user already marked as verified' });
                    }
                    else{
                       
                        client.query(txtUpdate,valUpdate)
                           
                            .then(resultUpdate=>{ 
                            console.log(resultUpdate)       
                                const dataReturn={

                                    

                                    id:resultUpdate.rows[0].id,
                                    email:resultUpdate.rows[0].email,
                                    firstname:resultUpdate.rows[0].firstname,
                                    lastname:resultUpdate.rows[0].lastname,
                                    address:resultUpdate.rows[0].address,
                                    status:resultUpdate.rows[0].status,
                                } 

                                  res.status(200).json({status:200,message:"User marked as verified", data:dataReturn}); 
                            })
                            .catch(e=>console.log(e))
                     }
                }  
           })
            .catch(e=>console.log(e))
    }
    
}
const usersCont = new UsersController;
export default usersCont;

