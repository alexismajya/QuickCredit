import config from'../config/config.json';
import myTok from 'jsonwebtoken';
import usersMod from'../models/users';
import bcrypt from'bcrypt';
import validateUser from '../validations/validateUser';

const usersCont={
    getAllUsers: (req, res) => {
        res.status(200).send(usersMod.users);
   },


    signUp: (req, res) => {
        // Validating 
    const { error } = validateUser.UserSignupValidator(req.body);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });

        let legisteruser = usersMod.users.find(u => u.email === req.body.email);
        if (legisteruser) return res.status(400).json({ status: 400, error: 'This email already registered !!' });
       
        legisteruser =usersMod.signUp(req.body);
        const newU={
            id:legisteruser.id,
            email: legisteruser.email,
            firstName: legisteruser.firstName,
            lastName: legisteruser.lastName,
            password:legisteruser.password,
            address:legisteruser.address,
            status:legisteruser.status,
            isAdmin:legisteruser.isAdmin, 
            
        };
        const token=myTok.sign({ sub: newU.id }, config.secret);
         res.status(200).json({status:200,Message:"Successfully registered", data: newU,token});

    },

    logIn:(req, res)=>{
    // Validating 
    const { error } = validateUser.UserLoginValidator(req.body);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });

    // Check email
    const loggeduser = usersMod.users.find(username => username.email === req.body.email);
    if (!loggeduser) return res.status(400).json({ status: 400, error: 'Email and/or password is incorrect' });

    // password
    const comparePass = bcrypt.compareSync(req.body.password, loggeduser.password);
    if (!comparePass) return res.status(400).json({ status: 400, error: 'Email and/or password is incorrect' });

    // Generate token
    const generate = {
      id: loggeduser.id,
      firstName: loggeduser.firstName,
      lastName: loggeduser.lastName,
      email: loggeduser.email,
      isAdmin: loggeduser.isAdmin,
    };
    const token=myTok.sign({ sub: generate.id }, config.secret);
    res.status(200).json({status:200,Message:"Logged In Successfully", data: generate,token});
    
  },
    
}
export default usersCont;

