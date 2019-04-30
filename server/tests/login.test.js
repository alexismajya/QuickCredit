var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var validateUser =require('../validations/validateUser');

it ('should return true if a valid email', function(){
	var isTrue=validateUser("email","alexism@gmail.com");
	expect(isTrue).to.be.true;
});
it ('should return false if an invalid email', function(){
	var isTrue=validateUser("email","alexismail.com");
	isTrue.should.equal(false);
});

it ('should return false if a password length is less than 6 characters', function(){
	var isTrue=validateUser("password","alex");
	isTrue.should.equal(false);
});
