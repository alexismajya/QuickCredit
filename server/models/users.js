	import bcrypt from 'bcrypt';
	class users{
		constructor(){
			this.users=[];
		}

	signUp(info){
		const newUser={
		id: this.users.length +1,
        email: info.email,
        firstName: info.firstName,
        lastName: info.lastName,
        password: bcrypt.hashSync(info.password,10),
        address:info.address,
        status:info.status,
        isAdmin:info.isAdmin,
		};
		this.users.push(newUser);
		return newUser;
	}
}

export default new users();
