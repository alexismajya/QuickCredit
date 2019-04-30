const validateUser=(name,value)=>{

if(name=="email"){
    var result= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return result.test(String(value).toLowerCase());
}
else if(name=="password" && value.length<6){
	return false;
}
}
module.exports=validateUser;