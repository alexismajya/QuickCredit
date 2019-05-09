const loginClick=()=>{
	var email=document.getElementById('email').value;
	var pass=document.getElementById('password').value;
		
	document.getElementById('feedback').style.display="none";

	if (email=="client"){
		window.location.href="applyforLoan.html";
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
