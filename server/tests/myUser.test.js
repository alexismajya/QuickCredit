import chai from 'chai';
import chaiHttp from 'chai-http';
import myserver from '../index';

const { expect } = chai;
const { assert} = chai;
chai.use(chaiHttp);



describe('Return users', () => {
  it('No user found', () => {
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
  it('The user fails to signup', () => {
    chai.request(myserver)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'alexis',
        lastName: 'majyambere',
        email: 'alexis@gmail.com',
        address:'kigali',
        status: 'unverified',
        password: 'alexishd45',
        isAdmin: 'true',
        isLoaggedIn:'false',//not allowed
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });
  it('Allow the client to sing up', () => {
    chai.request(myserver)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'alexis',
        lastName: 'majyambere',
        email: 'alexis@gmail.com',
        address:'kigali',
        status: 'unverified',
        password: 'alexishd45',
        isAdmin: 'true',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('token');
        expect(res.body).to.be.an('object');
      });
  });
  
  it('Password value must have 8 to 15 digits', () => {
    chai.request(myserver)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'alexis',
        lastName: 'majyambere',
        email: 'alexis@gmail.com',
        address:'kigali',
        password: 'alexis',
        status: 'unverified',
        isAdmin: 'false',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });
  it('isAdmin is required ', () => {
      chai.request(myserver)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'alexis',
          lastName: 'majyambere',
          email: 'alexis@gmail.com',
          address:'kigali',
          password: 'alexis234jh',
          status: 'unverified',
          isAdmin:'aaa',
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
      .post('/api/v1/auth/signup')
      .send({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        password: '',
        isAdmin:'',
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
         firstName: 'alexis',
          lastName: 'majyambere',
          email: 'alexis@gmail.com',
          address:'kigali',
          password: 'alexis234jh',
          status: 'unverified',
          isAdmin:'false',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });
  
});

describe('login', () => {
  it('User shoould log in', (done) => {
    chai.request(myserver)
	    .post('/api/v1/auth/signin')
	    .send({
	      email: 'alexis@gmail.com',
	     	password: 'alexis234jh',
  		})
      .end((err, res) => {
	      expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('All fields are required', (done) => {
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
      .patch('/api/v1/users/:client@gmail.com/verify')
      .send({
        status:"verified",
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
  });
  
});
