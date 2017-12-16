const request = require('request')
const config = require('../config/config')
const qs = require('querystring');

/** oauthFunc to authorize app */
exports.oauthFunc = (req, res) => {
    let client = {
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        oauth_callback: 'http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback'
      }
      let url = `${config.TWITTER_BASE_URL}/oauth/request_token`
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
      let client = {
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        access_token_key: req.query.access_token_key,
        access_token_secret: req.query.access_token_secret
      }
      let params = {
        screen_name: req.query.screen_name
      }
      let url = `${config.TWITTER_BASE_URL}/1.1/users/show.json?` + qs.stringify(params)
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
        
        return res.json(body);
      })
}

/** tweetsFunc to get list user */
exports.tweetsFunc = (req, res) => {
    let client = {
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        access_token_key: req.query.access_token_key,
        access_token_secret: req.query.access_token_secret
      }
      let params = {
        screen_name: req.query.screen_name,
        count: 100
      }
      let url = `${config.TWITTER_BASE_URL}/1.1/statuses/user_timeline?` + qs.stringify(params)
    
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
        return res.json(body);
      })
}

/** disconnectFunc to disconnect with twitter */
exports.disconnectFunc = (req, res) => {
 
}
exports.verifyFunc = (req, res) => {
    let client = {
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        token: req.query.oauth_token
    }
    let url = `${config.TWITTER_BASE_URL}/oauth/access_token?oauth_verifier`
    request.post({url: url, oauth: client, form: { oauth_verifier: req.query.oauth_verifier }}, (err, r, body) => {
      if (err) {
          return res.send(500, { message: err.message });
        }
        let req_data = qs.parse(body)
        res.setHeader('x-auth-token', req_data.oauth_token);
        return res.json(qs.parse(body))
      })
}


  