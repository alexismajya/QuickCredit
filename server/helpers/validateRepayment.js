import jo from 'joi';


exports.repayValidator=(repay)=>{

	const repayFormat= {
	    amount: jo.number().positive().allow(0).required() 
  };
  return jo.validate(repay, repayFormat);

};


