import chai from 'chai';
import chaiHttp from 'chai-http';
import myserver from '../index';

const { expect } = chai;
const { assert} = chai;
chai.use(chaiHttp);

describe('Request new loan', () => {
  it('Client must log in first', () => {
    let user="alexis@gmail.com";
    let isLoggedIn="false";
    
    chai.request(myserver)
      .post('/api/v1/loans/apply')
      .send({

        user: 'alexis@gmail.com',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
        
      });
  });  
it('A client cannot request a loan', () => {   
    chai.request(myserver)
      .post('/api/v1/loans/apply')
      .send({
        user: 'alexis@gmail.com',
        tenor: '12',
        amount: '10000',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });

  it('repaid value should be a bollean', () => {
    chai.request(myserver)
      .post('/api/v1/loans/apply')
      .send({

        repaid: 'yes',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
        
      });
  });
  it('status value should be one of (pending, rejected, approved', () => {
    chai.request(myserver)
      .post('/api/v1/loans/apply')
      .send({

        status: 'allowed',
        approvedBy:'admin@gmail.com',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
        
      });
  });
  
  it('All fields are required', () => {
    chai.request(myserver)
      .post('/api/v1/loans/apply')
      .send({
        user: '',
        tenor: '',
        amount: '',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });

  it('There is an unrepaid  loan', () => {
    chai.request(myserver)
      .post('/api/v1/loans/apply')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        user: 'alexis@gmail.com',
        repaid: 'false',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });
});

 
describe('Get all loans', () => {
  it('loan(s) not found', () => {
    chai.request(myserver)
      .get('/api/v1/loans')
      .end((err, res) => {
      	expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(404);
      });
  });
  it('Should return all loans', () => {
    chai.request(myserver)
      .get('/api/v1/loans')
      .send(req.body)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
      });
  });
});