var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var setupParse= require('../parseUtilities').setupParse;
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;


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
    // console.log('response', response)
    var objectId = response.objectId;
    console.log(objectId);
    var JSONdata= JSON.stringify(response);
    localStorage.setItem('local storage user', response);
    localStorage.setItem('username', response.username);
    localStorage.setItem('token', response.sessionToken);
    localStorage.setItem('objectID', response.objectId);
    localStorage.setItem('phone',response.phone);
    localStorage.setItem('user', JSONdata);
    if (JSON.parse(localStorage.getItem('user')).phone <=0){
       self.props.router.navigate('/restaurants/', {trigger: true})
     } else if (!businessCollection.parseWhere('owner', '_User', User.current().get('objectId'))){
         self.props.router.navigate('/registration/', {trigger: true})
    } else if (businessCollection.parseWhere('owner', '_User', User.current().get('objectId'))){
      self.props.router.navigate('/dashboard/', {trigger: true})
    }
  });
},

// } else if (JSON.parse(localStorage.getItem('user')).phone) {
//   self.props.router.navigate('/registration/', {trigger: true})
// }




  render: function(){
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
