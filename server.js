/** Load dependencies */
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
// const router=express.Router()
/** use bodyparser, cookieparser and expresssession as a middleware*/

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/** Load DB settings, config file and route file*/
const config = require('./server/config/config')

/** load routes*/

require('./server/routes')(app)

const port = config.server.port

app.listen(process.env.PORT || port)

console.log('App started on port ' + port)