	import moment from 'moment';
	class loans{
		constructor(){
			this.loans=[];
		}

	applyForLoan(info){
		const newLoan={
		id: this.loans.length +1,
        user: info.user,
        createdOn: moment().format('LL'),
        status: 'pending',
        repaid:"false",
        tenor: parseInt(info.tenor),
        amount: parseInt(info.amount),
        interest:parseInt( info.amount*5/100),
        paymentInstallment:(parseInt(info.amount)+(parseInt(info.amount)*5/100))/parseInt(info.tenor),
        balance: parseInt(info.amount)+(parseInt(info.amount)*5/100),
		};
		this.loans.push(newLoan);
		return newLoan;
	}
	allloans(){
		const all=
			this.loans;
		return all;

	}

}

export default new loans();