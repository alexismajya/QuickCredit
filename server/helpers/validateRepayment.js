import jo from 'joi';


exports.repayValidator=(repay)=>{

	const repayFormat= {
		loanId:jo.number().required(),
	    amount: jo.number().positive().allow(0).required() 

  };
  return jo.validate(repay, repayFormat);

};

