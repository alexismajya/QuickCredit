
import jo from 'joi';

exports.UserLoginValidator=(user)=>{

	const loginformat=jo.object().keys({
		email:jo.string().email().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required().error(errors=>{
			return{
				message: "The valid email is required"

			}
		}),

		password:jo.string().regex(/^[a-zA-Z0-9]{8,15}$/).required().error(errors=>{
			return{
				message: "Invalid password"
			}
		})
	}).with('email','password');
	return jo.validate(user,loginformat)
};

exports.UserSignupValidator=(user)=>{

	const signupFormat= {
	    firstName: jo.string().min(3).max(50).trim().required().regex(/^[A-Za-z]+$/),
	    lastName: jo.string().min(3).max(50).trim().alphanum().required(),
		email:jo.string().email().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required().error(errors=>{
			return{
				message: "The valid email is required"

			}
		}),
		password:jo.string().regex(/^[a-zA-Z0-9]{8,15}$/).required().error(errors=>{
			return{
				message: "Invalid password"
			}
		}),
	    address: jo.string().min(3).required(),
	    status: jo.string().valid('verified', 'unverified'),
	    isAdmin: jo.boolean().valid('true', 'false').required(),
	    isLoggedIn: jo.boolean().valid('true', 'false')   
  };
  return jo.validate(user, signupFormat);

};

exports.verifyUserValidator=(user)=>{

	const updateFormat= {
		status: jo.string().valid('verified', 'unverified').required()
	   
  };
  return jo.validate(user, updateFormat);

};
