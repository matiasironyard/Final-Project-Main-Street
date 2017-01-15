var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var setupParse = require('../parseUtilities.js').setupParse;
var Modal = require('react-modal');
var User =  require('../parseUtilities.js').User;
require('../router').router;

// console.log('hi');

var SignUpComponent = React.createClass({

  getInitialState: function() {
    return {
      username: '',
      password: '',
      modalIsOpen: false,
      clickNext: 'Yes',
    };
  },

  handleEmail: function(e) {
    // e.preventDefault();
    var email = e.target.value;
    // console.log(email);
    this.setState({
      email: email
    });
  },

  handlePassword: function(e) {
    // e.preventDefault();
    var password = e.target.value;
    this.setState({
      password: password
    })
  },

  handlePhone: function(e) {
    // e.preventDefault();
    var phone = e.target.value;
    // console.log(phone);
    this.setState({
      phone: phone
    })
  },

  handleSignUp: function(e) {
    e.preventDefault();
    var signupData = {
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password
    };
    // console.log(signupData);
    this.props.handleSignUp(signupData);

    this.setState({
      email: '',
      phone: '',
      password: ''
    });
  },

  handleLogMeIn: function(e) {
    e.preventDefault();
    this.props.handleLogIn(e);
  },

  openModal: function() {
    this.setState({
      modalIsOpen: true
    });
    this.setState({
      clickNext: <i className="material-icons">check_circle</i>
    });
  },

  closeModal: function() {
    this.setState({
      modalIsOpen: false
    });
    this.setState({
      yes: <i className="material-icons">thumb_up</i>
    })
  },

  render: function() {
    return (
      <div className="signup-container container-fluid">
            <div className="signup-col  mdl-shadow--8dp col-md-4 col-md-offset-4">
              <div className="login-headers row">
              {/*<div className="nav-header-img col-md-2"/>*/}
                  <span className="login-header-1">In The</span>
                  <span className="login-header-2"> Mood<i className="material-icons">restaurant_menu</i></span>
              </div>
              <div className="mdl-card__actions mdl-card--border">
                <h4>Sign up</h4>
              </div>
              <form onSubmit = {this.handleSignUp} id="signup">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input onChange={this.handleEmail} value={this.state.email} className="mdl-textfield__input" name="email" id="email" type="email" placeholder="email" />
                  <label className="mdl-textfield__label" htmlFor="email"/>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input onChange={this.handlePassword} value={this.state.password} className="mdl-textfield__input" name="password" id="password" type="password" placeholder="Password Please" />
                  <label className="mdl-textfield__label" htmlFor="password"/>
                </div>
                <div className="what">
                  <h6 className="mdl-card__title-tex">Are you a business owner?</h6>
                  <button type="button" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.openModal}>{this.state.clickNext}</button>
                </div>
                <Modal  className="signup-modal col-md-4 col-md-offset-4 " isOpen={this.state.modalIsOpen}>
                  <div className="signup-modal form-group">
                    <div className="login-headers row">
                    {/*<div className="nav-header-img col-md-2"/>*/}
                        <span className="login-header-1">In The</span>
                        <span className="login-header-2"> Mood<i className="material-icons">restaurant_menu</i></span>
                    </div>
                    <h3>We make it easy</h3>
                    <p>5 minutes. Yes, that's all it will take to create your restaurant's profile. We want to help you get up and going fast, so that you get back to creating awesome dishes!</p>
                    <div className="mdl-card__actions mdl-card--border">
                      <p>If you are a business owner, please enter your business phone number (area code and number without dashes, spaces, or parentheses). We will use your number to get your business information from Yelp. Make sure to use the number that appears in Yelp.</p>
                    </div>
                    <input onChange={this.handlePhone} value={this.state.phone} className= "mdl-textfield__input" name="phone" id="phone" type="text" placeholder="Your business phone number please..." />
                      <button type="button" className="btn btn-warning pull-right"onClick={this.closeModal}><i className="material-icons">thumb_up</i></button>
                  </div>
                </Modal>
                <div className="singup btns mdl-card__actions mdl-card--border">
                  <button onClick={this.handleSignUp} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" type="submit">Sign Me Up</button>
                  <button onClick={this.handleLogMeIn} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" type="submit">I have an account</button>
                </div>

              </form>
            </div>
          </div>
    );
  }
});

var AuthenticationContainer = React.createClass({

  getInitialState: function() {
    return {
      username: ''
    };
  },

  handleSignUp: function(signupData) {
    var self = this;
    var username = signupData.email;
    var password = signupData.password;
    console.log(password);
    var data = {
      'username': signupData.email,
      'password': signupData.password,
      'phone': signupData.phone
    };
    $.post('https://matias-recipe.herokuapp.com/users', data).then(function(response) {
      self.props.router.navigate('/login/', {
        trigger: true
      })
    // User.login(username, password);
    // console.log(this.state);
    });
  },

  handleLogIn: function() {
    var self = this;
    self.props.router.navigate('/login/', {
      trigger: true
    });
  },

  render: function() {
    return (
      <div>
        <SignUpComponent  handleSignUp={this.handleSignUp}  handleLogIn={this.handleLogIn}/>
      </div>
    );
  }
});

module.exports = {
  AuthenticationContainer: AuthenticationContainer,
}
