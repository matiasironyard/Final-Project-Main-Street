var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var setupParse = require('../parseUtilities').setupParse;
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User = require('../parseUtilities').User;
var LogInTemplate = require('../templates/login-template.jsx');

var Modal = require('react-modal');
require('../router').router;

// console.log('hi');

var LoginComponent = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
    };
  },

  handleEmail: function(e) {
    var email = e.target.value;
    this.setState({
      email: email
    });
  },

  handlePassword: function(e) {
    var password = e.target.value;
    this.setState({
      password: password
    });
  },

  handleLogMeIn: function(e) {
    e.preventDefault();
    var logMeIn = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.handleLogMeIn(logMeIn);
    this.setState({
      email: '',
      password: ''
    });
  },

  render: function() {
    return (
    <div className="login-container container-fluid">
      <div className="login mdl-shadow--8dp col-md-4 col-md-offset-4 col-sm-5 col-sm-offset-3 col-xs-12">
        <div className="login-headers row">
        {/*<div className="nav-header-img col-md-2"/>*/}
            <span className="login-header-1">In The</span>
            <span className="login-header-2"> Mood<i className="material-icons">restaurant_menu</i></span>
        </div>
        <h2 className="login-subheader">Please Login</h2>
        <div className="msg"></div>
        <div id="loading"></div>
        <form className="col-md-12"onSubmit={this.handleLogMeIn} id="login">
          <span className="error"></span>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input onChange={this.handleEmail} value={this.state.email} className="mdl-textfield__input" name="email" id="email-login" type="email" placeholder="email" />
            <label  className="mdl-textfield__label" htmlFor="email-login"/>
          </div>

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input onChange={this.handlePassword} value={this.state.password} className="mdl-textfield__input" name="password" id="password-login" type="password" placeholder="Password Please" />
            <label className="mdl-textfield__label" htmlFor="password-login"/>
          </div>
          <div>
            <button onSubmit={this.handleLogIn} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect pull-left" type="submit" value="Beam Me Up!">Sign In!</button>
          </div>
        </form>
      </div>
    </div>
    );
  }
});

var LogInContainer = React.createClass({
  getInitialState: function() {
    return {
      username: ''
    };
  },

  handleLogMeIn: function(logMeIn) {
    var self = this;
    var businessCollection = new BusinessCollection();
    var username = logMeIn.email;
    // console.warn(username);
    var password = logMeIn.password;
    var callbackObj =
      this.setState({
        username: logMeIn.username
      });
      // User.login(username, password).then(function(response){
    // $.ajax('https://matias-recipe.herokuapp.com/login?username=' + username + '&password=' + password).then(function(response) {
    //   var objectId = response.objectId;
    //   var JSONdata = JSON.stringify(response);
    //   // localStorage.setItem('local storage user', response);
    //   localStorage.setItem('username', response.username);
    //   // localStorage.setItem('token', response.sessionToken);
    //   // localStorage.setItem('objectID', response.objectId);
    //   localStorage.setItem('phone', response.phone);
    //   localStorage.setItem('user', JSONdata);
    //
    //   var loginLogic = businessCollection.parseWhere('owner', '_User', User.current().get('objectId')).fetch().then(function(response) {
    //     if (businessCollection.length >= 1) {
    //       self.props.router.navigate('/dashboard/', {
    //         trigger: true
    //       })
    //     } else if (!JSON.parse(localStorage.getItem('user')).phone) {
    //       self.props.router.navigate('/restaurants/', {
    //         trigger: true
    //       })
    //     } else {
    //       self.props.router.navigate('/registration/', {
    //         trigger: true
    //       })
    //     }
    //   });
    // });
    $.ajax({
      url: 'https://matias-recipe.herokuapp.com/login?username=' + username + '&password=' + password,
      success: function(response){
        $('#loading').append('<div  id="mdl-spinner mdl-js-spinner is-active"></div>');
        var objectId = response.objectId;
        var JSONdata = JSON.stringify(response);
        // localStorage.setItem('local storage user', response);
        localStorage.setItem('username', response.username);
        // localStorage.setItem('token', response.sessionToken);
        // localStorage.setItem('objectID', response.objectId);
        localStorage.setItem('phone', response.phone);
        localStorage.setItem('user', JSONdata);

        var loginLogic = businessCollection.parseWhere('owner', '_User', User.current().get('objectId')).fetch().then(function(response) {
          if (businessCollection.length >= 1) {
            self.props.router.navigate('/dashboard/', {
              trigger: true
            })
          } else if (!JSON.parse(localStorage.getItem('user')).phone) {
            self.props.router.navigate('/restaurants/', {
              trigger: true
            })
          } else {
            self.props.router.navigate('/registration/', {
              trigger: true
            })
          }
        });
      },
      error: function(response){
        $('.msg').html('<h6 id="container">Your credentials were wrong. Please try again.</h6>');
        setTimeout(function () {
          $('.msg').remove();
          location.reload();
        }, 3000);
      }
    });
  },

  render: function() {

    return (
      <div>
        <LoginComponent handleLogMeIn={this.handleLogMeIn} router={this.props.router}/>
      </div>
    );
  }
});

module.exports = {
  LogInContainer: LogInContainer,
}
