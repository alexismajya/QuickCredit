import chai from 'chai';
import chaiHttp from 'chai-http';
import myserver from '../index';

const { expect } = chai;
const { assert} = chai;
chai.use(chaiHttp);

describe('An admin should post a loan repayment', () => {
  it('Should return a client loan repayments', () => {
    chai.request(myserver)
      .get('/api/v1/repayments/History/:"1"')
      .end((err, res) => {
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('error');
      });
  }); 
   it('repayment(s) not found', () => {
    chai.request(myserver)
      .get('/api/v1/repayments')
      .end((err, res) => {
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(404);
        expect(res.body).to.be.an('object');
      });
  });
 
});