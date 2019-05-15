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
  it('A client can request a loan', () => {   
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
  it('Should return the loans of the specified user', () => {   
    chai.request(myserver)
      .patch('/api/v1/loans/:"alexis@gmail.com"')
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });
  it('Should return all paid loans', () => {
    chai.request(myserver)
      .get('/api/v1/loans/Current-Paid-Loans/:"true"')
      .end((err, res) => {
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(404);
        expect(res.body).to.be.an('object');
      });
  });
  it('Should return all unpaid loans', () => {
    chai.request(myserver)
      .get('/api/v1/loans/Current-Paid-Loans/:"false"')
      .end((err, res) => {
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(404);
        expect(res.body).to.be.an('object');
      });
  });
  it('Should return pending loans ', () => {
    chai.request(myserver)
      .get('/api/v1/loans/pending-rejected-approved/:"pending"')
      .end((err, res) => {
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(404);
        expect(res.body).to.be.an('object');
      });
  });
  it('Should return rejected loans ', () => {
    chai.request(myserver)
      .get('/api/v1/loans/pending-rejected-approved/:"rejected"')
      .end((err, res) => {
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(404);
        expect(res.body).to.be.an('object');
      });
  });
  it('Should return approved loans ', () => {
    chai.request(myserver)
      .get('/api/v1/loans/pending-rejected-approved/:"approved"')
      .end((err, res) => {
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(404);
        expect(res.body).to.be.an('object');
      });
  });
  
});