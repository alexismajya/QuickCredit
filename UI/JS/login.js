const loginClick=()=>{
	var email=document.getElementById('email').value;
	var pass=document.getElementById('password').value;
		
	document.getElementById('feedback').style.display="none";

	if (email=="client"){
		window.location.href="applyForLoan.html";
	}
	else if(email=="Admin"){
		window.location.href="payment.html";

	}
	else{
					
		document.getElementById('feedback').style.display="block";
		document.getElementById('feedback').style.color="red";
		document.getElementById('feedback').style.border="solid 1px red";
		document.getElementById('feedback').innerHTML="Incorect email and/or password";
	}
				
	
}
const setLogoPosition=()=>{
	var formseiz=document.getElementById('form_login').clientHeight;
	var marginTop=70+((formseiz-370)/2);
	document.getElementById('log1').style.margin=marginTop+"px"+" auto auto 22%";
	document.getElementById('allforms').style.margin="-"+marginTop+" auto auto 170px";

}