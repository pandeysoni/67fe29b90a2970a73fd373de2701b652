/** Load dependencies */
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
/** use bodyparser, cookieparser and expresssession as a middleware*/

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(expressSession({secret:'somesecrettokenhere', resave: true, saveUninitialized: true}));
/** Load DB settings, config file and route file*/
const config = require('./server/config/config')
require('./server/config/passport')(config,passport);
app.use(passport.initialize());
app.use(passport.session());
/** load routes*/

require('./server/routes')(app, passport)

const port = config.server.port

app.listen(process.env.PORT || port)

console.log('App started on port ' + port)

module.exports = app