import bcrypt from 'bcrypt';
const myusers=[
{
    //admin
    id:1,
    email:"admin@yahoo.fr",
    firstname:"alexis",
    lastname:"majyambere",
    password:"alexismajya",
    address:"kigali",
    status:"verified",
    isadmin::"true",
},
{ //client
    id:2,
    email:"client@yahoo.fr",
    firstname:"alexis",
    lastname:"majyambere",
    password:"alexismajya",
    address:"kigali",
    status:"unverified",
    isadmin::"false",
},
{
    //not allowed
    id:2,
    bday:"5/23/1989",
    email:"client@yahoo.fr",
    firstname:"alexis",
    lastname:"majyambere",
    password:"alexismajya",
    address:"kigali",
    status:"unverified",
    isadmin::"false",
},
];
export default{myusers,};