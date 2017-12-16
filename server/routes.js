/** router functionality writtern in controller */
const controller = require('./twitter-service/twitter-service-controller')
const request = require('request')
const config = require('./config/config')
/** router endpoints defined */
module.exports = (app, passport) => {
	/** Get access_token */
	app.post('/oauth_request', controller.oauthFunc)
	
	// app.use('/api/v1', router);
	/** Get user profile */
	app.post('/connect', controller.connectFunc)

	/** Get list of 100 tweets */
	app.get('/tweets', controller.tweetsFunc)

	/** disconnect twitter */
	app.post('/disconnect', controller.disconnectFunc)


	app.get('/auth/twitter/reverse',
		passport.authenticate('twitter'), (req, res) => {
				res.redirect('/');
	});
	app.post('/verify_request', controller.verifyFunc)
    
	app.get('/', (req, res) => {
		return res.send('welcome to twitter');
	});
}

