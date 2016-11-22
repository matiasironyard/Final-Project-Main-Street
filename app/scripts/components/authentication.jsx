var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var setupParse= require('../parseUtilities').setupParse;
require('../router').router;

console.log('hi');

var SignUpComponent = React.createClass({

  getInitialState: function(){
    return {
      username: '',
      password: '',
    };
  },

  handleEmail: function(e){
    // e.preventDefault();
    var email = e.target.value;
    console.log(email);
    this.setState({email: email});
  },

  handlePassword: function(e){
    // e.preventDefault();
    var password = e.target.value;
    this.setState({password: password})
  },

  handlePhone: function(e){
    // e.preventDefault();
    var phone = e.target.value;
      console.log(phone);
    this.setState({phone: phone})
  },

  handleSignUp: function(e){
    e.preventDefault();
    var signupData = {
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password
    };
    console.log(signupData);
    this.props.handleSignUp(signupData);
    this.setState({email: '', phone: '', password: ''});
  },

  render: function(){
    return (
          <div className="col-md-offset-1 col-md-5">
            <h2>Need an Account? Sign Up!</h2>
            <form onSubmit = {this.handleSignUp} id="signup">

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input onChange={this.handleEmail} value={this.state.email} className="form-control" name="email" id="email" type="email" placeholder="email" />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input onChange={this.handlePhone} value={this.state.phone} className="form-control" name="phone" id="phone" type="text" placeholder="Phone Please" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input onChange={this.handlePassword} value={this.state.password} className="form-control" name="password" id="password" type="password" placeholder="Password Please" />
              </div>

              <input onSubmit={this.handleSignUp} className="btn btn-primary" type="submit" value="Sign Me Up!" />
            </form>
          </div>
  );
  }
});

var LoginComponent = React.createClass({
  getInitialState: function(){
    return{
      username: '',
      password: '',
    };
  },

  handleEmail: function(e){
    var email = e.target.value;
    this.setState({email: email});
  },

  handlePassword: function(e){
    var password = e.target.value;
    this.setState({password: password});
  },

  handleLogMeIn: function(e){
    e.preventDefault();
    var logMeIn = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.handleLogMeIn(logMeIn);
    this.setState({email: '', password: ''});
  },

  render: function(){
    return (
          <div className="col-md-offset-1 col-md-4">
            <h2>Please Login</h2>
            <form onSubmit={this.handleLogMeIn} id="login">
              <span className="error"></span>
              <div className="form-group">
                <label htmlFor="email-login">Email address</label>
                <input onChange={this.handleEmail} value={this.state.email} className="form-control" name="email" id="email-login" type="email" placeholder="email" />
              </div>

              <div className="form-group">
                <label htmlFor="password-login">Password</label>
                <input onChange={this.handlePassword} value={this.state.password}className="form-control" name="password" id="password-login" type="password" placeholder="Password Please" />
              </div>

              <input onSubmit={this.handleLogIn} className="btn btn-primary" type="submit" value="Beam Me Up!" />
            </form>
          </div>
  );
  }
});

var AuthenticationContainer = React.createClass({

  getInitialState: function(){
    return {
      username: ''
    };
  },

  handleSignUp: function(signupData){
  var data={
    'username': signupData.email,
    'password': signupData.password,
    'phone': signupData.phone
  };
    $.post('https://matias-recipe.herokuapp.com/users', data).then(function(response){
      // console.log('what are you looking at? :)');
      console.warn(response);
    });
  },

handleLogMeIn: function(logMeIn){
  var self = this;
  var username= logMeIn.email;
  console.warn(username);
  var password= logMeIn.password;
  var callbackObj =
  this.setState({username: logMeIn.username});

  $.get('https://matias-recipe.herokuapp.com/login?username=' + username + '&password=' + password).then(function(response){
    console.log('response', response)
    localStorage.setItem('local storage user', response);

    var JSONdata= JSON.stringify(response);
    localStorage.setItem('username', response.username);
    localStorage.setItem('token', response.sessionToken);
    localStorage.setItem('objectID', response.objectId);
    localStorage.setItem('phone',response.phone);
    localStorage.setItem('user', JSONdata);
    if(response.sessionToken){
      self.props.router.navigate('registration/', {trigger: true});
    };
  });
},



  render: function(){
    return (
      <div>
        <SignUpComponent handleSignUp={this.handleSignUp} />
        <LoginComponent handleLogMeIn={this.handleLogMeIn} router={this.props.router}/>
      </div>
    );
  }
});

module.exports = {
  AuthenticationContainer: AuthenticationContainer,
}
