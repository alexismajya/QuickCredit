import path from'path';
import express from 'express';
import cors from'cors';
import bodyParser from'body-parser';
import Route from'./routes/AllRoutes';
import swagger from 'swagger-ui-express';
import documentation from '../documentation'

const appExp = express();
appExp.use('/QuickCredit-doc', swagger.serve, swagger.setup(documentation));


appExp.use(bodyParser.urlencoded({ extended: true }));
appExp.use(bodyParser.json());
appExp.use(cors());

appExp.get('/', (req, res) => res.send({Quick_Credit_Server_message: 'welcome to Quick Credit System'}));

appExp.use(Route);

const port = process.env.PORT || 30000;
appExp.listen(port, () =>
console.log("Server listening on port "+port));

export default appExp;
