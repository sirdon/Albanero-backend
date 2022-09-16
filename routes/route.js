const express = require('express');
const routes = express.Router();
const AuthRoute = require('./auth');
const TweetRoute = require('./tweet');
routes.use("/auth", AuthRoute)
routes.use("/tweet", TweetRoute)
module.exports = routes