/** router functionality writtern in controller */
const controller = require('./twitter-service/twitter-service-controller')

/** router endpoints defined */
module.exports = (app) => {
	/** Get access_token */
	app.get('/oauth_request', controller.oauthFunc)

	/** Get user profile */
	app.post('/connect', controller.connectFunc)

	/** Get list of 100 tweets */
	app.get('/tweets', controller.tweetsFunc)

	/** disconnect twitter */
	app.post('/disconnect', controller.disconnectFunc)
}

