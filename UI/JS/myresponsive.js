const mediascreen=(m)=>{
	if(m.matches){
		return true;
	}
	else
	{
		return false;
	}
}

const myFunction=(f)=>{
	var x = document.getElementById("mymenu");
	if (x.className === "headingmenu") {
		x.className += " responsive";
		setLogoPosition=(f);
	} else {
		 x.className = "headingmenu";
		 setLogoPosition=(f);
	}
}
const newRequest=()=>{
	window.location.href="applyforLoan.html";
}

