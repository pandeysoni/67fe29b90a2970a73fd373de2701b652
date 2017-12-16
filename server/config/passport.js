const TwitterStrategy = require('passport-twitter').Strategy

module.exports = function (config, passport) {
    passport.use(new TwitterStrategy({
        consumerKey: config.TWITTER_CONSUMER_KEY,
        consumerSecret: config.TWITTER_CONSUMER_SECRET,
        callbackURL: "http://127.0.0.1:8080/"
    },
    function(accessToken, refreshToken, profile, cb) {
        let user = {
            accessToken: accessToken, 
            refreshToken: refreshToken,
            profile: profile
        }
        cb(JSON.stringify(user));
    }
    ))
}