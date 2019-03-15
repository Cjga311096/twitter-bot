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

Notes: 
    1. Change the url from mongodb into config to localhost
    2. Tweets limits and Interval are optional. By default Tweets limits is 20 and Inteval 15min
    3. To set the interval, you must enter the time in milliseconds.

## Usage with Docker Compose

1. `Open a command prompt at the root of the application's folder.`
2. `Run docker-compose build`
3. `Run docker-compose up`

Note: Remember the url from mongodb into Docker is mongodb://mongodb:27017/

## Add SSH capabilities to nodejs container

1. `Run the following command to start Docker-SSH`
    docker run -e FILTERS={\"name\":[\"^/container-name$\"]} -e AUTH_MECHANISM=noAuth \
  --name new-container -p 2222:22  --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jeroenpeeters/docker-ssh
2. `Access the container through SSH`

ssh user@localhost -p 2222

The output will look similar to: 

        ###############################################################
        ## Docker SSH ~ Because every container should be accessible ##
        ###############################################################
        ## container | /container-name                               ##
        ###############################################################

        /docker $
3. `cd src`

output: 

    /docker/src $

4. `Run node app.js "Hashtag" "Tweets limits" "Interval"`