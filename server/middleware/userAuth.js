import {verify} from 'jsonwebtoken';
import config from'../config/config.json';


export default (req,res,next)=>{
	try{
		const token=req.headers.authorization.split(' ')[1];
		const adminAccess=verify(token,config.secret);
		if(	adminAccess.isadmin===true){
			return next();
		}
		else{
			return res.json({status:403, Error:"Access denied"});
		}
		req.user=adminAccess;
		next();

	}catch(err){
		return ({status:401,Error:'Access denied'});
	}
};