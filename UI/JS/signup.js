function setLogoPosition(){
	var formseiz=document.getElementById('form_signup').clientHeight;
	var marginTop=70+((formseiz-370)/2);
	document.getElementById('log1').style.margin=marginTop+"px"+" auto auto 22%";
	document.getElementById('allforms').style.margin="-"+marginTop+" auto auto 170px";

}
function myFunction() {
	var elem = document.getElementById("menu");
	if (elem.className === "headingmenu") {
		elem.className += " responsive";
	} else {
		 elem.className = "headingmenu";
	}
}
function payClick(){
	setLogoPosition();
}