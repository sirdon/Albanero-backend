const express = require('express');
const routes = express.Router();
const TweetController = require('../controller/Tweet');
const { validateToken } = require('../controller/Authentication');
const { tweetListValidation, tweetGetValidation } = require('../validation/tweet')
const { runValidation } = require("../validation");
routes.post("/create", tweetListValidation, runValidation, validateToken, TweetController.createTweet)
routes.get("/get/:tweetId", tweetGetValidation, runValidation, validateToken, TweetController.getTweet)
routes.get("/get-all", validateToken, TweetController.getAllTweet)
routes.get("/get-all-others", validateToken, TweetController.getOthersAllTweet)
routes.put("/update/:tweetId", tweetGetValidation, runValidation, validateToken, TweetController.updateTweet)
routes.delete("/delete/:tweetId", tweetGetValidation, runValidation, validateToken, TweetController.removeTweet)
module.exports = routes