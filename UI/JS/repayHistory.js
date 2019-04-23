const setLogoPosition=()=>{
	viewLoans();
	var formseiz=document.getElementById('form_history').clientHeight;
	var marginTop=70+((formseiz-370)/2);
	document.getElementById('log1').style.margin=marginTop+"px"+" 0px 0 0%";
	document.getElementById('allforms').style.margin="-"+(80+marginTop)+" auto auto 170px";



}
const myFunction=()=> {
	var elem = document.getElementById("menu");
	if (elem.className === "headingmenu") {
		elem.className += " responsive";
	} else {
		 elem.className = "headingmenu";
	}
}
const tablecells=(loanId,date,Minstall,amount)=>{
	var tab=document.getElementById("RepaymentsTable");
	var newrow=tab.insertRow();

	newrow.insertCell(0).innerHTML=loanId;
	newrow.insertCell(1).innerHTML="";
	newrow.insertCell(2).innerHTML=date;
	newrow.insertCell(3).innerHTML=Minstall;
	newrow.insertCell(4).innerHTML=amount;
	newrow.insertCell(5).innerHTML="";
}
const viewLoans=()=>{
	var UserArray=[];
	document.getElementById('RepaymentsTable');
		//if(localStorage.Repayments){
		//UserArray=JSON.parse(localStorage.Repayments);
		//}
		UserArray=[{Id:1,createdOn:"4/4/2019",monthkyInstallment:"40000",amount:"40000"}];
		for(var i=0; i<UserArray.length;i++){
			tablecells(UserArray[i].Id,UserArray[i].createdOn,UserArray[i].monthkyInstallment,UserArray[i].amount);
		}
}
const newApp=()=>{
	window.location.href="applyForLoan.html";
}

