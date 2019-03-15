const Twit = require('twit');
const config = require('./config.json');
const hashtag = process.argv[2] || '#btc';
const limit = process.argv[3] || config["limit"];
const interval = process.argv[4] || config["interval"];
const { connectToDatabase, disconnectToDatabase } = require('./db');
const model = require('./model.js');

const T = new Twit(config["twitter"]);
console.log('Configurando instancia...');

const filter = () =>{
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
        return model.tweets.create(newTweet)
          .then(res => {
            console.log(`${res}  \r\n`);
          })
          .catch(err => {
              console.log(err);
          })
      });
    });
    console.log(`${new Date().toISOString()} => Se encontraron ${tweets.length} tweets \r\n`);
  });
}
console.log(`${new Date().toISOString()} => Filtrando tweets con el hashtag: ${hashtag} \r\n`);
filter();
setInterval(()=>{
  console.log(`${new Date().toISOString()} => Filtrando tweets con el hashtag: ${hashtag} \r\n`);
  filter();
},interval*60000);