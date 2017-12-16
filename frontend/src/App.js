import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TwitterLogin from 'react-twitter-auth';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:4000';
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post, index) =>
          <div className="row"> 
            <li key={post.id}>
            <div className="col-md-1">{index+1}</div>
            <div className="col-md-9">{post.text}</div>
            </li>
          </div>
      )}
    </ul>
  );
  return (
    <div>
      {sidebar}
    </div>
  );
}
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
        const url = `${BASE_URL}/connect?access_token_key=${user.oauth_token}&access_token_secret=${user.oauth_token_secret}&screen_name=${user.screen_name}`;
        return axios.post(url).then(data => 
          this.setState({isAuthenticated: true, user: user, token: token, name: data.data.name, username: data.data.screen_name, profile_image: data.data.profile_image_url}))
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };
  
  refreshTweets = (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/tweets?access_token_key=${this.state.user.oauth_token}&access_token_secret=${this.state.user.oauth_token_secret}&screen_name=${this.state.user.screen_name}`;
    return axios.get(url).then(response => 
      ReactDOM.render(
        <Blog posts={response.data} />,
        document.getElementById('tweet-list')
      )
    )
}

  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <section className="container home">
          <p>User Details</p>
            <form className="form-inline" role="form">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="usr">Name:</label>
                  {this.state.name}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="usr">Username:</label>
                  {this.state.username}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="usr">Profile Image:</label>
                  <img src={this.state.profile_image} className="img-rounded" alt="Cinque Terre" ></img>
              </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <button onClick={this.refreshTweets} className="btn btn-primary" >
                      Refresh Tweets
                    </button>
                </div>
                <div className="col-md-3">
                <div className="form-group">
                  <button onClick={this.logout} className="btn btn-primary" >
                    Log out
                  </button>
                  </div>
                </div>
              </div>
              </div>
              <div className="col-md-10">
                <div id="tweet-list">
          
                </div>
              </div>
            </form>
          </section>
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
