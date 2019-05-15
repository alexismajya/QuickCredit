import config from'../config/config.json';
import myTok from 'jsonwebtoken';
import usersMod from'../models/users';
import bcrypt from'bcrypt';
import validateUser from '../helpers/validateUser';

const usersCont={
    getAllUsers: (req, res) => {
         if (!usersMod.allusers.length) 
            return res.status(404).json({status: 404, error: 'No user(s) found' });

         return res.status(200).json({status:200, data: usersMod.allusers(req.body)});
   },


    signUp: (req, res) => {
        // Validating 

        const { error } = validateUser.UserSignupValidator(req.body);

        if (error) 
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70)});

            let legisteruser = usersMod.users.find(u => u.email === req.body.email)

            if (legisteruser) 
                return res.status(400).json({ status: 400, error: 'This email already registered !!' });
            
            legisteruser =usersMod.signUp(req.body);
            
           
            const token=myTok.sign({ sub: legisteruser.id }, config.secret);
            res.status(201).json({status:201,message:"Successfully registered", data: legisteruser,token});
        
    },

    logIn:(req, res)=>{
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

            const TheoggedInfo=Object.keys(loggeduser).reduce((object,key)=>{
            if (key!="password" && key!="isLoggedIn") {object[key]=loggeduser[key]}
                return object;
                },{})

            res.status(200).json({status:200,message:"Logged In Successfully", data: TheoggedInfo,token});
        }
  },

    verifyUser:(req,res)=>{

             //validate data
        const { error } = validateUser.verifyUserValidator(req.body);
        if (error) 
            return res.status(400).json({ status: 400, error: error.details[0].message.slice(0,70) });

        
        const isloggedAsAdmin=usersMod.users.find(u => u.email === req.body.verifiedBy && u.isLoggedIn==="true" && u.isAdmin==="true")
                if(!isloggedAsAdmin)
                    return res.status(400).json({ status: 400, error: 'You are not allowed to verify the clients user account. Log in as Admin' });


        // Check if user exists

        let updateuser = usersMod.users.find(u => u.email === req.params.email);
        if (!updateuser) 
            return res.status(404).json({ status: 404, error: 'The user does not exist' });

        if (updateuser.status==="verified") 
            return res.status(400).json({ status: 400, error: 'The user already marked as verified' });

       

        updateuser.status=req.body.status;


        //return update

        updateuser=usersMod.users.find(u => u.email === req.params.email);

        const token=myTok.sign({ sub: updateuser.id }, config.secret);
            res.status(200).json({status:200,message:"User marked as verified", data:updateuser,token });


    },
    
}
export default usersCont;

