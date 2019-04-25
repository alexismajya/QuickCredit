
const tablecells=(Id,user,date,status,repaid,tenor,amount,inst,balance,interest)=>{
	var tab=document.getElementById("LoansTable");
	var newrow=tab.insertRow();

	newrow.insertCell(0).innerHTML=Id;
	newrow.insertCell(1).innerHTML=user;
	newrow.insertCell(2).innerHTML=date;
	newrow.insertCell(3).innerHTML=status;
	newrow.insertCell(4).innerHTML=repaid;
	newrow.insertCell(5).innerHTML=tenor;
	newrow.insertCell(6).innerHTML=amount;
	newrow.insertCell(7).innerHTML=inst;
	newrow.insertCell(8).innerHTML=balance;
	newrow.insertCell(9).innerHTML=interest;

	newrow.insertCell(10).innerHTML='<input type="button" class="tablebutton" value="Repay" onclick="repayLoan()"/>  ';
}
const viewUsers=()=>{
	var UserArray=[];
	document.getElementById('LoansTable');
		//if(localStorage.Users){
		//UserArray=JSON.parse(localStorage.Users);
		//}
		UserArray=[{id:1,user:"ale@gmail.com",createdOn:"4/4/2019",status:"pending",repaid:"false",tenor:12,amount:600000,paymentinstallments:52500,balance:630000,interest:30000}];
		for(var i=0; i<UserArray.length;i++){
			tablecells(UserArray[i].id,UserArray[i].user,UserArray[i].createdOn,UserArray[i].status,UserArray[i].repaid,UserArray[i].tenor,UserArray[i].amount,UserArray[i].paymentinstallments,UserArray[i].balance,UserArray[i].interest);
		}
}
const repayLoan=()=>{
	window.document.location="payment.html";
}

