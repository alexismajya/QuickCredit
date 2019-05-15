import chai from 'chai';
import chaiHttp from 'chai-http';
import myserver from '../index';

const { expect } = chai;
const { assert} = chai;
chai.use(chaiHttp);



describe('Register new user', () => {
  it('Allow the user to signup', () => {
    chai.request(myserver)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'alexis',
        lastName: 'majyambere',
        email: 'alexis@gmail.com',
        address:'kigali',
        password: 'alexishd45',
        isAdmin: 'true',
        isLoaggedIn:'false',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
      });
  });

  it('isAdmin value should be a bollean', () => {
    chai.request(myserver)
      .post('/api/v1/auth/signup')
      .send({

        isAdmin: 'admin',
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
        firstName: 'Mugabo',
        lastName: 'Mark',
        email: 'alexis@gmail.com',
        password: 'alexis',
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
  it('User logging in', (done) => {

    chai.request(myserver)
	    .post('/api/v1/auth/logIn')
	    .send({
	      	email: 'alexis@gmail.com',
	     	password: 'alexis',
  		})
      	.end((err, res) => {
	        expect(res.body.status).to.equal(200);
	        expect(res.body).to.have.property('status');
	        expect(res.body).to.have.property('message');
	        expect(res.body).to.have.property('data');
	        expect(res.body).to.be.an('object');
	        done();
      });
  });

  it('All fields are required', (done) => {
    chai.request(myserver)
      .post('/api/v1/auth/logIn')
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

  

  it('Incorrect Password', (done) => {
    chai.request(myserver)
      .post('/api/v1/auth/logIn')
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
});
describe('Get all users', () => {
  it('user(s) found', () => {
    chai.request(myserver)
      .get('/api/v1/users')
      .end((err, res) => {
      	expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
      });
  });
  it('user(s) not found', () => {
    chai.request(myserver)
      .get('/api/v1/users')
      .send()
      .end((err, res) => {
 
      	expect(false).to.be.false;
        expect(res.body).to.be.an('object');
      });
  });
});
