import chai from 'chai';
import chaiHttp from 'chai-http';
import myserver from '../index';
import myTok from 'jsonwebtoken';

const { expect,should,request,use } = chai;
const { assert} = chai;
chai.use(chaiHttp);



describe('Return users', () => {
  it('user found', () => {
    chai.request(myserver)
      .get('/api/v1/users')
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
      });
  });
});
describe('Register new user', () => {  
  it('It return 201 status code and create new user ', () => {
      chai.request(myserver)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'alexis',
          lastname: 'majyambere',
          email: 'alexis@gmail.com',
          address:'kigali',
          password: 'alexis234jh',
          isadmin:true,
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('status');
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("token");
          
        });
    });
    it('User should log in', (done) => {
      chai.request(myserver)
        .post('/api/v1/auth/signin')
        .send({
          email: 'alexis@gmail.com',
          password: 'alexis234jh',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("token");
          done();
        });
  });
  it('All fields are required', () => {
    chai.request(myserver)
      .post('/api/v1/auth/signup')
      .send({
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        password: '',
        isadmin:'',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });
 it('Email exist', () => {
    chai.request(myserver)
      .post('/api/v1/auth/signup')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .send({
         firstname: 'alexis',
          lastname: 'majyambere',
          email: 'alexis@gmail.com',
          address:'kigali',
          password: 'alexis234jh',
          status: 'unverified',
          isadmin:'false',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });
it('both emai and password are required', (done) => {
  chai.request(myserver)
    .post('/api/v1/auth/signin')
    .send({
      email: '',
      password: '',
    })
    .end((err, res) => {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
      done();
    });
});
it('Invalid password', (done) => {
  chai.request(myserver)
    .post('/api/v1/auth/signin')
    .send({
      email: 'alexis@gmail.com',
      password: 'myname',
    })
    .end((err, res) => {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
      done();
    });
});
it('Valid password', (done) => {
  chai.request(myserver)
    .post('/api/v1/auth/signin')
    .send({
      email: 'alexis@gmail.com',
      password: 'myname234w',
    })
    .end((err, res) => {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
      done();
    });
});
});
describe('Verify a user', () => {
  it('A verified user should be marked as "verified"', () => {
    chai.request(myserver)
      .patch('/api/v1/users/alexis@gmail.com/verify')
      .send({
        status:"verified",
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });
  it('Not verified, invalid status value"', () => {
    chai.request(myserver)
      .patch('/api/v1/users/alexis@gmail.com/verify')
      .send({
        status:"verifiedggg",
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });
});