const mongoose = require('mongoose');
const twitterSchema = new mongoose.Schema({
    date: String,
    hashtag: String,
    content: String,
    dateTweet: String,
    username: String,
    retweets: Number,
    favorites: Number
});
var tweets = mongoose.model('tweets', twitterSchema);
module.exports = {
    tweets
};