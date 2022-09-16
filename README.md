# albanero-backend assessment

# API documentation
## Routes
Here is the API address: https://albanero.herokuapp.com.


Postman collection link:- https://www.getpostman.com/collections/dd50c787caa388648d16
## Task 1
### Auth Api
* POST - https://albanero.herokuapp.com/api/v1/auth/login: to login with username and password. You'll need to send a JSON in the request body:
{
    "password":"12345678",
    "username":"usename"
}
* POST - https://albanero.herokuapp.com/api/v1/auth/logout: to logout from current login
* POST - https://albanero.herokuapp.com/api/v1/auth/register: to register with username and password. You'll need to send a JSON in the request body:
{
    "password":"12345678",
    "username":"usename"
}
* GET - https://albanero.herokuapp.com/api/v1/auth/activate/:token : to verify your account



### Tweet Api
* POST - https://albanero.herokuapp.com/api/v1/tweet/create: to register with username and password. You'll need to send a JSON in the request body:
{
    "content":"test tweet 3"
}
and token in headers:
token : your login token

* GET - https://albanero.herokuapp.com/api/v1/tweet/get/tweetId: to get a tweet with tweetId
* GET - https://albanero.herokuapp.com/api/v1/tweet/get-all: to get all tweets of logged in user
* GET - https://albanero.herokuapp.com/api/v1/tweet/get-all-others: to get all tweets of other than logged in user
* PUT - https://albanero.herokuapp.com/api/v1/tweet/update/tweetId: to update tweet with tweetId. You'll need to send a JSON in the request body:
{
   "content":"edit content"
}

* DELETE - https://albanero.herokuapp.com/api/v1/tweet/delete/tweetId: to delete tweet with tweetId.



