const conn =require('../config/connector.js');
const {Client}=require ('pg');
// const client=new Client({
//        user:"postgres",
//        host :"localhost",
//        port:"5432",
//        database:"quickdb"
// })
const client=new Client(process.env.DATABASE_URL);

client.connect()
		
      	.then(()=>client.query(`drop table IF EXISTS repayments`))
      	.then(()=>client.query(`drop table IF EXISTS loans`))
      	.then(()=>client.query(`drop table IF EXISTS myusers`))
      	.then(()=>console.log("Reset DATABASE..."))

      .then(()=>client.query(`CREATE TABLE IF NOT EXISTS myusers(
	    id SERIAL PRIMARY KEY,
	    email VARCHAR (50) UNIQUE NOT NULL,
	    firstName VARCHAR (40) NOT NULL,
	    lastName VARCHAR (40) NOT NULL,
	    password VARCHAR (300) NOT NULL,
	    address VARCHAR (50)  NOT NULL,
	    status VARCHAR (20) NOT NULL DEFAULT 'unverified',
	    isAdmin BOOLEAN NOT NULL DEFAULT false
	    
	    )`))
   
      .then(()=>client.query(`CREATE TABLE IF NOT EXISTS loans(
	    id SERIAL PRIMARY KEY,
	    email VARCHAR (50) UNIQUE NOT NULL,
	    createdOn TIMESTAMP NOT NULL,
	    status VARCHAR (50) NOT NULL DEFAULT 'pending',
	    repaid BOOLEAN NOT NULL DEFAULT false,
	    tenor INT  NOT NULL,
	    amount INT  NOT NULL,
	    interest INT NOT NULL,
	    paymentInstallment INT NOT NULL,
	    balance INT NOT NULL,

	    FOREIGN KEY (email) REFERENCES myusers(email)
	    )`))

      .then(()=>client.query(`CREATE TABLE IF NOT EXISTS repayments(
      	id SERIAL PRIMARY KEY,
	    createdOn TIMESTAMP NOT NULL,
	    loanId INT NOT NULL,
	    amount  INT NOT NULL,
	   
	    FOREIGN KEY (loanId) REFERENCES loans(id)
    	)`))

      .then(()=>console.log("Done successfully"))
      .catch(e=>console.log(e))
      .finally(()=>client.end())


