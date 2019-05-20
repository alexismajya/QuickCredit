import {verify} from 'jsonwebtoken';
import config from'../config/config.json';


export default (req,res,next)=>{
	try{
		const tok=req.headers.authorization.split(' ')[1];
		const decodeUser=verify(tok,config.secret);
		if(	req.isAdmin==="true"){
			return next();
		}
		else{
			return res.json.({status:403, Error:"Access denied"});
		}
		req.theUser=decodeUser;
		next();
	}catch(err){
		return ({status:401,Error:'Access denied'});
	}
};