	import moment from 'moment';
	import lo from'../models/loans';
	class repayments{
		constructor(){
			this.repayments=[];
		}

	repayLoan(info,res){
		const newRepay={
		id: this.repayments.length +1,
        createdOn: moment().format('LL'),
        loanId: parseInt(info.loanId),
        amount: parseInt(info.amount),
		};
		
		let loan=lo.loans.find(l=>l.id===info.loanId);

		if(loan.balance<info.amount)
			return res.status(404).json({status: 404, error: 'Please ! the repay amount is greater than the loan balance: '+loan.balance });
		
		loan.balance=parseInt(loan.balance)-parseInt(info.amount)
				

		this.repayments.push(newRepay);
		return newRepay;
	}
	
}

export default new repayments();