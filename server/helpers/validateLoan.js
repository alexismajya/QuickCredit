
import jo from 'joi';


exports.applyValidator=(loan)=>{

	const applyFormat= {
		id:jo.number(),
		user:jo.string().email().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
		tenor:jo.number().max(12).min(1).required(),
	    amount: jo.number().positive().required(),
	    status: jo.string().valid('pending', 'approved', 'rejected'),
	    repaid: jo.boolean().valid('true', 'false'),  
	    interest: jo.number().positive().allow(0),
	    paymentInstallment:jo.number().positive().allow(0),
	    balance:jo.number().positive().allow(0)
  };
  return jo.validate(loan, applyFormat);

};

exports.approveValidator=(loan)=>{

	const approveFormat= {
		status: jo.string().valid('pending', 'approved', 'rejected').required()
	   
  };
  return jo.validate(loan, approveFormat);

};
