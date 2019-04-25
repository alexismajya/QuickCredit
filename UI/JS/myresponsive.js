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
const setLogoPosition=(theform)=>{
	

   var media=window.matchMedia('(max-width: 992px)');
    var myscreen=mediascreen(media);
    media.addListener(mediascreen);

    	var formseiz=document.getElementById(theform).clientHeight;
		var marginTop=90+((formseiz-370)/2);

    if(theform==="form_apply"|| theform==="form_login" || theform==="form_payment" ||theform==="form_signup"){
		if(myscreen==true){
			if(theform==='form_signup'){
				document.getElementById('allforms').style.margin="0px auto auto -180px";

			}
			else{
				
				document.getElementById('allforms').style.margin="80px auto auto -180px";
			}
			document.getElementById('log1').style.margin="50px auto auto 34%";
		}
		else{

			document.getElementById('log1').style.margin=marginTop+"px"+" auto auto 22%";
			document.getElementById('allforms').style.margin="-"+marginTop+" auto auto 170px";
		}
	}
	else if(theform==="view_loans" || theform==="form_verify" || theform==="form_history" ||theform==="form_current"){
		if(myscreen==true){
			document.getElementById('log1').style.margin="50px auto auto 34%";
			document.getElementById('allforms').style.margin="130px 0 0 -180%";
		}
		else{
			document.getElementById('log1').style.margin=marginTop+"px"+" 0px 0  0%";
			document.getElementById('allforms').style.margin="-"+(180+marginTop)+" auto auto 170px";
		}

	}

}
