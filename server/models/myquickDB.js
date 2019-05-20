const {Client}=require ('pg');
const client=new Client({
	user:"postgres",
	password:"Alexism1!?",
	host :"localhost",
	port:"5432",
	Database:"quickDB"

})
client.connect()
.then(()=>console.log("connected successfully"))
.catch(e=>console.log(e))
.finally(()=>client.end())
