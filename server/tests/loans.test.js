import chai from 'chai';
import chaiHttp from 'chai-http';
import myserver from '../index';

const { expect } = chai;
const { assert} = chai;
chai.use(chaiHttp);

describe('Request new loan', () => {
  
  it('A client fails to request a loan', () => {   
    chai.request(myserver)
      .post('/api/v1/loans')
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
      .post('/api/v1/loans')
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
      .post('/api/v1/loans')
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
      .post('/api/v1/loans')
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
  it('should not apply loan, tenor must between 1 and 12', () => {
    chai.request(myserver)
      .post('/api/v1/loans')
      .send({
        user: 'alexis@gmail.com',
        amount: '10000',
        tenor: '13',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
    });
  it('should not apply loan, amount must be positive number', () => {
    chai.request(myserver)
      .post('/api/v1/loans')
      .send({
        user: 'alexis@gmail.com',
        tenor: '12',
        amount: '-10000',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
    });
  it('should not apply loan, tenor must be number', () => {
    chai.request(myserver)
      .post('/api/v1/loans')
      .send({
        user: 'alexis@gmail.com',
        tenor: '1h',
        amount: '10000',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
    });

  it('There is an unrepaid  loan, you should not apply', () => {
    chai.request(myserver)
      .post('/api/v1/loans')
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
});
describe('unpaid loans', () => {
  it('Should return the loans of the specified user', () => {   
    chai.request(myserver)
      .get('/api/v1/loans/1000')
      .end((err, res) => {
        console.log(res.body);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });
  it('Should return all unpaid loans', () => {
    chai.request(myserver)
      .get('/api/v1/loans?status=approved&repaid=false')
      .end((err, res) => {
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(404);
        expect(res.body).to.be.an('object');
      });
  });
it('Should return all paid loans', () => {
    chai.request(myserver)
      .get('/api/v1/loans?status=approved&repaid=true')
      .end((err, res) => {
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.status).to.equal(404);
        expect(res.body).to.be.an('object');
      });
  });
it('It should return 400 status when not allowed to approve a loan', () => {   
    chai.request(myserver)
      .patch('/api/v1/loans/1')
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });
   
});
