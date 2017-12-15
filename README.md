Boilerplate using node express framework

### Install an app

Run the following command in root directory of an app in command prompt.

###### *Install node packages*

npm install

### Run an app

###### *Run Server*

Run the following command in root directory of an app in command prompt.

node server.js

You can see the port number in command prompt after sucessfull run

You can change the settings in server/config/config.js file

###### *Connect API for user profile detail*
```js
http://127.0.0.1:3000/connect?consumer_key=<consumer_key>&consumer_secret=<consumer_secret>&access_token_key=<access_token_key>&access_token_secret=<access_token_secret>&screen_name=sonipandey1
```
```js
http://127.0.0.1:3000/tweets?consumer_key=<consumer_key>&consumer_secret=<consumer_secret>&access_token_key=<access_token_key>&access_token_secret=<access_token_secret>screen_name=sonipandey1
```