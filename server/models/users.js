	import bcrypt from 'bcrypt';
	class Users{
		constructor(){
			this.users=[];
		}

	signUp(info){
		if(info.isAdmin=="true"){
			info.status="verified"
		}
		else{
			info.status="unverified"
		}
		const newUser={

		id: this.users.length +1,
        email: info.email,
        firstName: info.firstName,
        lastName: info.lastName,
        password: bcrypt.hashSync(info.password,5),
        address:info.address,
        status:info.status,
        isAdmin:info.isAdmin,
        isLoggedIn:"false",
		};
		this.users.push(newUser);
		
		///to remove password and islogged from the user object
		const TheNewUserToReturn=Object.keys(newUser).reduce((object,key)=>{
			if (key!="password" && key!="isLoggedIn") {object[key]=newUser[key]}
				return object;
		},{})
		return TheNewUserToReturn;
	}
	allusers(info){
		const all=
			this.users;
		return all;
	}
	
}

const users = new Users;
export default users;