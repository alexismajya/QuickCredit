import path from'path';
import express from 'express';
const appExp = express();
import cors from'cors';
import bodyParser from'body-parser';

appExp.use(bodyParser.urlencoded({ extended: false }));
appExp.use(bodyParser.json());
appExp.use(cors());

appExp.get('/', (req, res) => res.send({Quick_Credit_Server_message: 'welcome to Quick Credit System'}));

const port = process.env.NODE_ENV || 30000;
const server = appExp.listen(port,  () =>
    console.log("Server listening on port "+port));

