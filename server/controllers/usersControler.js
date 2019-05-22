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
const uData=[];

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
        
        const values = [req.body.id,req.body.email ,req.body.firstname, req.body.lastname, bcrypt.hashSync(req.body.password,5), req.body.address,stat, req.body.isadmin];
        const quer=`insert into myusers VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
        
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
                return result.rows[0];
            });     
        
    }

    async logIn(req, res){
        // Validating 
        const { error } = validateUser.UserLoginValidator(req.body);
        if (error) 
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70) });

        // Check email

        const loggeduser = usersMod.users.find(u => u.email === req.body.email);
        if (!loggeduser) 
            return res.status(400).json({ status: 400, error: 'Email and/or password is incorrect' });

        // password
        else{
            const comparePass = bcrypt.compareSync(req.body.password, loggeduser.password);
            if (!comparePass) 
                return res.status(400).json({ status: 400, error: 'Email and/or password is incorrect' });

            // Generate token

            const token=myTok.sign({ sub: loggeduser.id }, config.secret);
            //isloggedIn
            loggeduser.isLoggedIn="true";

            //return the logged user

           
            res.status(200).json({status:200,message:"Logged In Successfully", data: loggeduser,token});
        }
    }

    verifyUser(req,res,next){

             //validate data
        const { error } = validateUser.verifyUserValidator(req.body);
        if (error) 
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70) });



        const isloggedAsAdmin=usersMod.users.find(u => u.isLoggedIn==="true" && u.isAdmin==="true")
                if(!isloggedAsAdmin)
                    return res.status(400).json({ status: 400, error: 'You are not allowed to verify the clients user account. Log in as Admin' });


        // Check if user exists

        let updateuser = usersMod.users.find(u => u.email === req.params.userEmail);
        if (!updateuser) 
            return res.status(404).json({ status: 404, error: 'The user does not  exist' });

        if (updateuser.status==="verified") 
            return res.status(400).json({ status: 400, error: 'The user already marked as verified' });


        updateuser.status=req.body.status;

        

        const updatedInfo={
            id:updateuser.id,
            email: updateuser.email,
            firstName: updateuser.firstName,
            lastName: updateuser.lastName,
            address:updateuser.address,
            status:updateuser.status,
            isAdmin:updateuser.isAdmin,      
        }
        res.status(200).json({status:200,message:"User marked as verified", data:updatedInfo});

    }
    
}
const usersCont = new UsersController;
export default usersCont;

