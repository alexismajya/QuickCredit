import config from'../config/config.json';
import myTok from 'jsonwebtoken';
import usersMod from'../models/users';
import bcrypt from'bcrypt';
import validateUser from '../helpers/validateUser';

const usersCont={
    getAllUsers: (req, res) => {
         if (!usersMod.users.length) 
            return res.status(404).json({ length:0,status: 404, error: 'No user(s) found' });

         return res.status(200).json({status:200, data: usersMod.users});
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
            return res.status(400).json({ status: 400, error: error.details[0].message });

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
            res.status(200).json({status:200,message:"Logged In Successfully", data: loggeduser,token});
        }
  },
    
}
export default usersCont;

