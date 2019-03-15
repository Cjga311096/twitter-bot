const Twit = require('twit');
const config = require('./config.json');
const hashtag = process.argv[2] || '#btc';
const limit = process.argv[3] || config["limit"];
const interval = process.argv[4] || config["interval"];
const { connectToDatabase, disconnectToDatabase } = require('./db');
const model = require('./model.js');
var handleInterval = null;

const T = new Twit(config["twitter"]);
console.log('Configurando instancia...');
console.log(`${new Date().toISOString()} => Hashtag: ${hashtag} \r\n`);
console.log(`${new Date().toISOString()} => Tweets Limit: ${limit} \r\n`);
console.log(`${new Date().toISOString()} => Interval: ${interval} milliseconds \r\n`);

const filterTweetsByHashtag = () =>{
  T.get('search/tweets', { q: hashtag, count: limit }, function(err, reply) {
    if(err) return handleError(err);
    const tweets = reply.statuses;
    tweets.forEach(tweet => {
      let newTweet = {
        date: new Date().toISOString(),
        hashtag: hashtag,
        content: tweet.text,
        dateTweet: tweet.created_at,
        username: tweet.user.name,
        retweets: tweet.retweet_count,
        favorites: tweet.favorite_count
      }; 
      connectToDatabase()
      .then(() => {
        return insertTweet(newTweet)
      });
    });
    console.log(`${new Date().toISOString()} => Se encontraron ${tweets.length} tweets \r\n`);
  });
}
const handleError = (error) => {
  clearInterval(handleInterval);
  console.log(`${new Date().toISOString()} =>  Error: ${error}`);
}
const insertTweet = (tweet) => {
  model.tweets.create(tweet)
    .then(res => {
      console.log(`${res}  \r\n`);
    })
    .catch(err => {
        console.log(err);
    })
}
const startInterval = () => {
  handleInterval = setInterval(() => {
    console.log(`${new Date().toISOString()} => Filtrando tweets con el hashtag: ${hashtag} \r\n`);
    filterTweetsByHashtag();
  },interval);
  console.log(`${new Date().toISOString()} => Filtrando tweets con el hashtag: ${hashtag} \r\n`);
  filterTweetsByHashtag();
}

startInterval();
 


