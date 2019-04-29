import config from'../config/config.json';
import myTok from 'jsonwebtoken';
import users from'../models/users';
import bcrypt from'bcrypt';

module.exports = {
    getAllUsers: (req, res) => {
        res.status(200).send(users);
   },


    signUp: (req, res) => {
        if (!req.body.lastName || !req.body.email || !req.body.password){
            return res.status(400).json('Fill out all required fields');
        }
        const newUser = {
        id:users.length +1,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password,10),
        address:req.body.address,
        status:req.body.status,
        isAdmin:req.body.isAdmin, 
        
    };
    const token=myTok.sign({ sub: newUser.id }, config.secret);
     users.push(newUser);
     res.status(200).json({status:200, data: newUser,token});

    },

    findUser:({ email, pass }) =>{
    const user =users.find(u => u.email === email && u.password === pass);
        if (user) {
        const token = myTok.sign({ sub: user.id }, config.secret);
            const { password, ...userWithoutPassword } = user;
             return {
             ...userWithoutPassword,token
            };
        }
    },
    
}
