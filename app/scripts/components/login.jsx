var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var setupParse= require('../parseUtilities').setupParse;
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
var LogInTemplate = require('../templates/login-template.jsx');


var Modal = require('react-modal');
require('../router').router;

// console.log('hi');

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
          <div className="login mdl-card mdl-shadow--2dp col-md-4 col-md-offset-4">
            <h2 className="login-header">Please Login</h2>
            <form onSubmit={this.handleLogMeIn} id="login">
              <span className="error"></span>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input onChange={this.handleEmail} value={this.state.email} className="mdl-textfield__input" name="email" id="email-login" type="email" placeholder="email" />
                <label  className="mdl-textfield__label" htmlFor="email-login"/>
              </div>

              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input onChange={this.handlePassword} value={this.state.password} className="mdl-textfield__input" name="password" id="password-login" type="password" placeholder="Password Please" />
                <label className="mdl-textfield__label" htmlFor="password-login"/>
              </div>

              <button onSubmit={this.handleLogIn} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect pull-right" type="submit" value="Beam Me Up!">Sign In!</button>
            </form>
          </div>
  );
  }
});

var LogInContainer = React.createClass({

  getInitialState: function(){
    return {
      username: ''
    };
  },

handleLogMeIn: function(logMeIn){
  var self = this;
  var businessCollection = new BusinessCollection();
  var username= logMeIn.email;
  // console.warn(username);
  var password= logMeIn.password;
  var callbackObj =
  this.setState({username: logMeIn.username});

  $.get('https://matias-recipe.herokuapp.com/login?username=' + username + '&password=' + password).then(function(response){
    console.log('response', response)
    var objectId = response.objectId;
    console.log(objectId);
    var JSONdata= JSON.stringify(response);
    // localStorage.setItem('local storage user', response);
    localStorage.setItem('username', response.username);
    // localStorage.setItem('token', response.sessionToken);
    // localStorage.setItem('objectID', response.objectId);
    localStorage.setItem('phone',response.phone);
    localStorage.setItem('user', JSONdata);

    var loginLogic = businessCollection.parseWhere('owner', '_User', User.current().get('objectId')).fetch().then(function(response){
      if(businessCollection.length >= 1){
        self.props.router.navigate('/dashboard/', {trigger: true})
      } else if (!JSON.parse(localStorage.getItem('user')).phone){
        self.props.router.navigate('/restaurants/', {trigger: true})
      } else {
        self.props.router.navigate('/registration/', {trigger: true})
      }
      });
  });
},


  render: function(){

    return (
      <LogInTemplate>
      <div className="login-container container">
        <div className="login-row row">
          <LoginComponent handleLogMeIn={this.handleLogMeIn} router={this.props.router}/>
        </div>
      </div>
      </LogInTemplate>
    );
  }
});

module.exports = {
  LogInContainer: LogInContainer,
}
