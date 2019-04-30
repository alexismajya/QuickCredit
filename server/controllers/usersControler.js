import config from'../config/config.json';
import myTok from 'jsonwebtoken';
import usersCont from'../models/users';
import bcrypt from'bcrypt';
import validateUser from '../validations/validateUser';

module.exports = {
    getAllUsers: (req, res) => {
        res.status(200).send(users);
   },


    signUp: (req, res) => {
        if (!req.body.lastName || !req.body.email || !req.body.password){
            return res.status(400).json('Fill out all required fields');
        }
        else if(!validateUser("email",req.body.email)){
            return res.status(400).json('Invalid email, see example here: myemail@example.com');

        }
        let legisteruser = usersCont.users.find(u => u.email === req.body.email);
        if (legisteruser) return res.status(400).json({ status: 400, error: 'This email already registered !!' });
       
        legisteruser =usersCont.signUp(req.body);
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

    findUser:({ email, pass }) =>{
    const user =usersCont.find(u => u.email === email && u.password === pass);
        if (user) {
        const token = myTok.sign({ sub: user.id }, config.secret);
            const { password, ...userWithoutPassword } = user;
             return {
             ...userWithoutPassword,token
            };
        }
    },
    
}

