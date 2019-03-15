# Twitter Bot

A twitter bot using Twit and Mongoose.

## Encode Consumer Key, Consumer Secret, Access Token and Access Token Secrete into config.json
    
        "twitter": {
            "consumer_key": "",
            "consumer_secret": "",
            "access_token": "",
            "access_token_secret": "",
        }

## Usage without docker

1. `git clone https://github.com/Cjga311096/twitter-bot.git`
2. `cd twitter-bot`
3. `npm i`
4. `cd ./src`
5. `node app.js "Hashtag" "Tweets limits" "Interval"`

Note: Change the url from mongodb into config to localhost

## Usage with Docker Compose

1. `Open a command prompt at the root of the application's folder.`
2. `Run docker-compose build`
3. `Run docker-compose up`
