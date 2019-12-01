import chai from 'chai';
import chaiHttp from 'chai-http';
import myserver from '../index';

const { expect } = chai;
const { assert} = chai;
chai.use(chaiHttp);

describe('An admin should post a loan repayment', () => {

  it('No loan found, no repayment allowed', () => {
    chai.request(myserver)
      .post('/api/v1/loans/4/repayment')
      .send({
        amount: '10000',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
    });
  
  it('You can post a loan in fever of client', () => {
    chai.request(myserver)
      .post('/api/v1/loans/1/repayment')
      .send({
        amount: '10000',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
    });

  it('Should return a client loan repayments. no data found', () => {
    chai.request(myserver)
      .get('/api/v1/loans/100/repayments')
      .end((err, res) => {
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('error');
      });
  }); 
   it('Shoud get all repayments', () => {
    chai.request(myserver)
      .get('/api/v1/repayments')
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(200);
        expect(res.body).to.be.an('object');
      });
  });
});