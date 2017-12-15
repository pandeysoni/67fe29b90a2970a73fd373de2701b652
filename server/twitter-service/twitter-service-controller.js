const request = require('request')
const config = require('../config/config')
var qs = require('querystring');

/** oauthFunc to authorize app */
exports.oauthFunc = (req, res) => {
    var client = {
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        callbackURL: config.CALLBACK_URL
      }
      var url = `${config.TWITTER_BASE_URL}/oauth/request_token`
      request.post({url: url, oauth: client}, (e, r, body) => {
        var req_data = qs.parse(body)
        return res.json(req_data)
     })
}

/** connectFunc to get user profile data */
exports.connectFunc = (req, res) => {
      var client = {
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        access_token_key: config.ACCESS_TOKEN,
        access_token_secret: config.ACCESS_TOKEN_SECRET
      }
      var params = {
        screen_name: req.body.screen_name
      }
      var url = `${config.TWITTER_BASE_URL}/1.1/users/show.json?` + qs.stringify(params)
      request.get({url: url, oauth:client, json:true }, function (e, r, user) {
        if(e){
          return res.send(e);
        }
        if(user.errors){
          return res.send(user.errors[0].message); 
        }
        return res.json(user);
      })
}

/** tweetsFunc to get list user */
exports.tweetsFunc = (req, res) => {
    var client = {
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        access_token_key: config.ACCESS_TOKEN,
        access_token_secret: config.ACCESS_TOKEN_SECRET
      }
      var params = {
        screen_name: 'sonipandey1',
        count: 100
      }
      var url = `${config.TWITTER_BASE_URL}/1.1/statuses/user_timeline?` + qs.stringify(params)
    
      request.get({url:url, oauth:client, json:true }, (err, response, tweets) => {
        if(err){
          return res.send(err);
        }
        if(tweets.errors){
          return res.send(tweets.errors[0].message); 
        }
        return res.json(tweets);
      })
}

/** disconnectFunc to disconnect with twitter */
exports.disconnectFunc = () => {
   
}