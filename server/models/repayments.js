	import moment from 'moment';
	import looo from'../models/loans';
	class repayments{
		constructor(){
			this.repayments=[];
		}

	repayLoan(info,lo,res){
		const newRepay={
		id: this.repayments.length +1,
        createdOn: moment().format('LL'),
        loanId: parseInt(lo),
        amount: parseInt(info.amount),
		};
		
		let loan=looo.loans.find(l=>l.id===parseInt(lo));

		if(loan.balance<info.amount)
			return res.status(404).json({status: 404, error: 'Please ! the repay amount is greater than the loan balance: '+loan.balance });
		
		loan.balance=parseInt(loan.balance)-parseInt(info.amount)
				

		this.repayments.push(newRepay);
		return newRepay;
	}
	allrepays(req){
		const allrepayments=
			this.repayments;
		return allrepayments;

	}
	
}

export default new repayments();