const request = require('request')
const config = require('../config/config')
const qs = require('querystring');

/** oauthFunc to authorize app */
exports.oauthFunc = (req, res) => {
    var client = {
        consumer_key: req.query.consumer_key,
        consumer_secret: req.query.consumer_key,
        callbackURL: config.CALLBACK_URL
      }
      var url = `${config.TWITTER_BASE_URL}/oauth/request_token`
      request.post({url: url, oauth: client}, (e, r, body) => {
        if(e){
            console.log(e)
            return res.send(e);
          }
          if(body.errors){
            return res.send(body.errors[0].message); 
          }
        //   return res.json(user);
        var req_data = qs.parse(body)
        return res.json(req_data)
     })
}

/** connectFunc to get user profile data */
exports.connectFunc = (req, res) => {
      var client = {
        consumer_key: req.query.consumer_key,
        consumer_secret: req.query.consumer_secret,
        access_token_key: req.query.access_token_key,
        access_token_secret: req.query.access_token_secret
      }
      var params = {
        screen_name: req.query.screen_name
      }
      var url = `${config.TWITTER_BASE_URL}/1.1/users/show.json?` + qs.stringify(params)
      request.get({url: url, oauth:client, json:true }, function (e, r, body) {
          console.log(client,params, body)
        if(e){
          return res.send(e);
        }
        if(body.errors){
            if(body.errors[0].code == 32){
                return res.status(401).send({ success : false, message : 'authentication failed' }); 
            }
            else{
                return res.status(500).send({ success : false, message : 'server error' }); 
            }
        }
        var req_data = qs.parse(body)
        return res.json(req_data);
      })
}

/** tweetsFunc to get list user */
exports.tweetsFunc = (req, res) => {
    var client = {
        consumer_key: req.query.consumer_key,
        consumer_secret: req.query.consumer_secret,
        access_token_key: req.query.access_token_key,
        access_token_secret: req.query.access_token_secret
      }
      var params = {
        screen_name: req.query.screen_name,
        count: 100
      }
      var url = `${config.TWITTER_BASE_URL}/1.1/statuses/user_timeline?` + qs.stringify(params)
    
      request.get({url:url, oauth:client, json:true }, (err, response, body) => {
        console.log(client,params, body)
        if(err){
          return res.send(err);
        }
        if(body.errors){
            if(body.errors[0].code == 32){
                return res.status(401).send({ success : false, message : 'authentication failed' }); 
            }
            else{
                return res.status(500).send({ success : false, message : 'server error' }); 
            }
        }
        var req_data = qs.parse(body)
        return res.json(req_data);
      })
}

/** disconnectFunc to disconnect with twitter */
exports.disconnectFunc = (req, res) => {
    
}