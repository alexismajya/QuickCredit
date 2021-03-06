# QuickCredit

#  [![Buld Status](https://travis-ci.org/alexismajya/QuickCredit.svg?branch=develop)](https://travis-ci.org/alexismajya/QuickCredit)[![Coverage Status](https://coveralls.io/repos/github/alexismajya/QuickCredit/badge.svg?branch=develop)](https://coveralls.io/github/alexismajya/QuickCredit?branch=develop)[![Code Climate](https://codeclimate.com/github/alexismajya/QuickCredit/badges/gpa.svg)](https://codeclimate.com/github/alexismajya/QuickCredit) 

## Description

Quick Credit is an online lending platform that provides short term soft loans to individuals.


## Documentation

1- A client can sing up

2- A user can sign in

3- A client can request for  only one loan at a time

4- A client can view a loan repayment history

5- Admin can mark a client as verified

6- Admin can view loan applications

7- Admin can approve or reject a client's loan application

8- Admin can post loan repayment transaction in favor of a client

9- Admin can view all current loans (not fully repaid)

10- Admin can view all repaid loans

## End-points


| Method         | Endpoint             | Description  |
| ---         |     ---      |          --- |
| POST   | /api/v1/auth/signup     | Create a user account   |
| POST     | /api/v1/auth/signin      | Sign in      |
| GET   | /api/v1/auth/users     | Get all users    |
| PATCH     | /api/v1/users/:email/verify       | Verify a user      |
| POST   | /api/v1/loans     | Apply for a loan   |
| GET     | /api/v1/loans      | Get all loan applications      |
| GET   | /api/v1/loans/:id     | Get a specific loan  application   |
| PATCH     | /api/v1/loans/:id       | Approve /reject a loan application      |
| POST   | /api/v1/loans/:id/repayment     | post repayment transaction loan   |
| GET     | /api/v1/loans/:loanId/repayments       | View specific loan repayment history     |
| GET     | /api/v1/repayments/loans      | get all loan repayment history     |
| GET   | /loans?status=approved&repaid=false      | View current loans   |
| GET     | /loans?status=approved&repaid=true       | View full paid loans      |


## Prerequisites

	. Node
	. Postman


## Setup

#### Getting Started
	
	Clone the repository at `https://github.com/alexismajya/QuickCredit.git`


#### Dependencies

	Run `npm install`

#### Start the server

	`npm start`


## Testing

	1. Use Postman to test api on `localhost:30000`

	2. To run the application test run `npm test` in commandline terminal


## Deployment

	This website was deployed on [heroku.com](https://alexis-quickcredit.herokuapp.com/).


	This website was deployed on [Github pages](https://alexismajya.github.io/QuickCredit/).



## Technologies used

#### Frontend:

	. JavaScript
	. HTML
	. CSS

#### Backend:

	. Node
	. Express
	. Mocha
	. Chai

## Author

#### Majyambere Alexis
