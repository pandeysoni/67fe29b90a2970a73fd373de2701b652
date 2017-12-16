import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:4000';

class App extends Component {

  constructor() {
    super();

    this.state = { isAuthenticated: false, user: null, token: ''};
  }

  onSuccess = (response) => {
    console.log(response)
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        console.log(user)
        this.setState({isAuthenticated: true, user: user, token: token});
        // const url = `${BASE_URL}/connect?access_token_key=${user.oauth_token}&access_token_secret=${user.oauth_token_secret}&screen_name=${user.screen_name}`;
        // return axios.post(url).then(response1 => console.log(response1))
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };

  refreshTweets = () => {
    const url = `${BASE_URL}/tweets?access_token_key=${this.state.user.oauth_token}&access_token_secret=${this.state.user.oauth_token_secret}&screen_name=${this.state.user.screen_name}`;
    return axios.get(url).then(response1 => console.log(response1))
  };

  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <p>User Details</p>
          <div>
            {this.state.user_profile_name}
            {this.state.username}
          </div>
          <div>
          <button onClick={this.refreshTweets} className="button" >
              Refresh Tweets
            </button>
            <button onClick={this.logout} className="button" >
              Log out
            </button>
          </div>
        </div>
      ) :
      (
        <TwitterLogin loginUrl="http://localhost:4000/verify_request"
                      onFailure={this.onFailed} onSuccess={this.onSuccess}
                      requestTokenUrl="http://localhost:4000/oauth_request"/>
      );

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
