import jo from 'joi';


exports.repayValidator=(repay)=>{

	const repayFormat= {
		loanId:jo.number().required(),
	    amount: jo.number().required(),  

  };
  return jo.validate(repay, repayFormat);

};

