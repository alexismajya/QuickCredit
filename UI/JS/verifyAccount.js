const tablecells=(Id,email,firstName,lastName,password,address,status,isAdmin)=>{
	var tab=document.getElementById("UsersTable");
	var newrow=tab.insertRow();

	newrow.insertCell(0).innerHTML=Id;
	newrow.insertCell(1).innerHTML=email;
	newrow.insertCell(2).innerHTML=firstName;
	newrow.insertCell(3).innerHTML=lastName;
	newrow.insertCell(4).innerHTML=password;
	newrow.insertCell(5).innerHTML=address;
	newrow.insertCell(6).innerHTML=status;
	newrow.insertCell(7).innerHTML=isAdmin;

	newrow.insertCell(8).innerHTML='<input type="button" class="tablebutton" value="Verified"/>';
}
const viewUsers=()=>{
	var UserArray=[];
	document.getElementById('UsersTable');
		
		UserArray=[{Id:1,email:"ale@gmail.com",firstName:"alexis",lastName:"majya",password:"alexis",address:"kigali",Status:"unverified",isAdmin:"false"}];
		for(var i=0; i<UserArray.length;i++){
			tablecells(UserArray[i].Id,UserArray[i].email,UserArray[i].firstName,UserArray[i].lastName,UserArray[i].password,UserArray[i].address,UserArray[i].Status,UserArray[i].isAdmin);
		}
}

