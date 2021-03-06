/** Load dependencies */
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
/** use bodyparser, cookieparser and expresssession as a middleware*/

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(expressSession({secret:'somesecrettokenhere', resave: true, saveUninitialized: true}));
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Access-Control-Allow-Header', 'Content-Type'],
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
/** Load DB settings, config file and route file*/
const config = require('./server/config/config')
/** load routes*/

require('./server/routes')(app)

const port = config.server.port

app.listen(process.env.PORT || port)

console.log('App started on port ' + port)

module.exports = app