var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var setupParse= require('../parseUtilities').setupParse;
var Modal = require('react-modal');
require('../router').router;

// console.log('hi');

var SignUpComponent = React.createClass({

  getInitialState: function(){
    return {
      username: '',
      password: '',
      modalIsOpen: false,
      clickNext: 'Yes',
    };
  },

  handleEmail: function(e){
    // e.preventDefault();
    var email = e.target.value;
    // console.log(email);
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
      // console.log(phone);
    this.setState({phone: phone})
  },

  handleSignUp: function(e){
    e.preventDefault();
    var signupData = {
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password
    };
    // console.log(signupData);
    this.props.handleSignUp(signupData);

    this.setState({email: '', phone: '', password: ''});
  },

  handleLogMeIn: function(e){
    e.preventDefault();
    this.props.handleLogIn(e);
    console.log(this.state);
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
    this.setState({clickNext: <i className="material-icons">check_circle</i>});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
    this.setState({yes:<i className="material-icons">thumb_up</i>})
  },

  render: function(){
    return (
          <div className="signup-container container-fluid">
            <div className="signup-col  mdl-shadow--2dp col-md-3 col-md-offset-4">
              <h2 className="signup-header">In The Mood</h2>
              <h4 className="signup-subheader">@ Downtown Greenville</h4>
              <div className="mdl-card__actions mdl-card--border">
                <h4>Sign up</h4>
              </div>
              <form onSubmit = {this.handleSignUp} id="signup">
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input onChange={this.handleEmail} value={this.state.email} className="form-control" name="email" id="email" type="email" placeholder="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input onChange={this.handlePassword} value={this.state.password} className="form-control" name="password" id="password" type="password" placeholder="Password Please" />
                </div>
                <div className="mdl-card__actions mdl-card--border">
                  <h6 className="mdl-card__title-tex">Are you a business owner</h6>
                  <button type="button" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.openModal}>{this.state.clickNext}</button>
                </div>
                <Modal  isOpen={this.state.modalIsOpen}>
                  <div className="col-md-4 form-group">
                    <p>If you are a business owner, please enter your business phone number. We will use your number to get your business information from Yelp. Make sure to use the number that appears in Yelp.</p>
                    <label htmlFor="phone">Phone</label>
                    <input onChange={this.handlePhone} value={this.state.phone} className="form-control" name="phone" id="phone" type="text" placeholder="Phone Please" />
                      <button type="button" className="btn btn-warning"onClick={this.closeModal}><i className="material-icons">thumb_up</i></button>
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

  getInitialState: function(){
    return {
      username: ''
    };
  },

  handleSignUp: function(signupData){
    var self = this;
    var data={
      'username': signupData.email,
      'password': signupData.password,
      'phone': signupData.phone
    };
    $.post('https://matias-recipe.herokuapp.com/users', data).then(function(response){
        self.props.router.navigate('/login/', {trigger: true})
      console.warn(response);
    });
  },

  handleLogIn: function(elseif){
    var self = this;
    self.props.router.navigate('/login/', {trigger: true});
  },

  render: function(){
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
