const request = require('request')
const config = require('../config/config')
const qs = require('querystring');

/** oauthFunc to authorize app */
exports.oauthFunc = (req, res) => {
    var client = {
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        oauth_callback: 'http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback'
      }
      var url = `${config.TWITTER_BASE_URL}/oauth/request_token`
      request.post({url: url, oauth: client}, (e, r, body) => {
        if(e){
            return res.send(qc.parse(e));
          }
          if(body.errors){
            return res.send(qs.parse(body.errors)); 
          }
        return res.json(qs.parse(body))
     })
    
}

/** connectFunc to get user profile data */
exports.connectFunc = (req, res) => {
      var client = {
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        access_token_key: req.query.access_token_key,
        access_token_secret: req.query.access_token_secret
      }
      var params = {
        screen_name: req.query.screen_name
      }
      var url = `${config.TWITTER_BASE_URL}/1.1/users/show.json?` + qs.stringify(params)
      request.get({url: url, oauth:client, json:true }, function (e, r, body) {
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
        
        return res.json(qs.parse(body));
      })
}

/** tweetsFunc to get list user */
exports.tweetsFunc = (req, res) => {
    var client = {
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        access_token_key: req.query.access_token_key,
        access_token_secret: req.query.access_token_secret
      }
      var params = {
        screen_name: req.query.screen_name,
        count: 100
      }
      var url = `${config.TWITTER_BASE_URL}/1.1/statuses/user_timeline?` + qs.stringify(params)
    
      request.get({url:url, oauth:client, json:true }, (err, response, body) => {
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
exports.verifyFunc = (req, res) => {
    var client = {
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        token: req.query.oauth_token
      }
      var url = `${config.TWITTER_BASE_URL}/oauth/access_token?oauth_verifier`
      request.post({url: url, oauth: client, form: { oauth_verifier: req.query.oauth_verifier }}, (err, r, body) => {
        if (err) {
            return res.send(500, { message: err.message });
          }
          var req_data = qs.parse(body)
          console.log(req_data)
          res.setHeader('x-auth-token', req_data.oauth_token);
        //   return res.status(200).send(JSON.stringify(req.user_id));
         return res.json(qs.parse(body))
        })
}


  