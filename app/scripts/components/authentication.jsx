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

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  render: function(){
    return (
          <div className="singup col-md-5 col-md-offset-4">
            <h3>Sing up</h3>
            <form onSubmit = {this.handleSignUp} id="signup">
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input onChange={this.handleEmail} value={this.state.email} className="form-control" name="email" id="email" type="email" placeholder="email" />
              </div>
              <p>Are you a business owner?</p>
              <button type="button" className="btn btn-primary" onClick={this.openModal}>Yes!</button>
              <Modal isOpen={this.state.modalIsOpen}>
                <div className="col-md-4 form-group">
                  <p>If you are a business owner, please enter your business phone number. We will use your number to get your business information from yelp. Make sure to use the number that appears in yelp</p>
                  <label htmlFor="phone">Phone</label>
                  <input onChange={this.handlePhone} value={this.state.phone} className="form-control" name="phone" id="phone" type="text" placeholder="Phone Please" />
                    <button type="button" className="btn btn-warning"onClick={this.closeModal}>Done</button>
                </div>
              </Modal>

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

  render: function(){
    return (
      <div>
        <SignUpComponent handleSignUp={this.handleSignUp} />
      </div>
    );
  }
});

module.exports = {
  AuthenticationContainer: AuthenticationContainer,
}
