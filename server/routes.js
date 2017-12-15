/** router functionality writtern in controller */
const controller = require('./twitter-service/twitter-service-controller')

/** router endpoints defined */
module.exports = (app, passport) => {
	/** Get access_token */
	app.get('/oauth_request', controller.oauthFunc)
	app.get('/auth/twitter',
		passport.authenticate('twitter'), (req, res) => {
				res.redirect('/');
		});

	/** Get user profile */
	app.post('/connect', controller.connectFunc)

	/** Get list of 100 tweets */
	app.get('/tweets', controller.tweetsFunc)

	/** disconnect twitter */
	app.post('/disconnect', controller.disconnectFunc)


	app.get('/', (req, res) => {
		return res.send('welcome to twitter');
	});
}

