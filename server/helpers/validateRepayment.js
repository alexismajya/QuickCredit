import jo from 'joi';


exports.repayValidator=(repay)=>{
	const repayFormat= {
	    amount: jo.number().positive().required() 
  };
  return jo.validate(repay, repayFormat);
};


