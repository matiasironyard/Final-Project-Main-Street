var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var $ = require('jquery');
require('../router').router;








var LandingContainer = React.createClass({
  handleNav: function(e) {
    e.preventDefault();
    var self = this;
    self.props.router.navigate('/authentication/', {
      trigger: true
    });
  },

  render: function(){
    return(
      <div className="landing row">
        <div className="landing-pane mdl-shadow--8dp col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
          <div className="login-headers row">
          {/*<div className="nav-header-img col-md-2"/>*/}
              <span className="login-header-1">In The</span>
              <span className="login-header-2"> Mood<i className="material-icons">restaurant_menu</i></span>
          </div>
          <div className="landing-content row">
            <div className="col-md-10 col-md-offset-1">
              <h3>Welcome to Downtown Greenville's Restaurant App</h3>
              <div className="call-to-action-1">IN THE MOOD is downtown Greenville's home for the best restaurants in the upstate of South Carolina! Quickly and easily find what you are in the mood for using a clean and intuitive interface giving you specials, menus, reviews, pictures and directions to your favorite restaurants.
              </div>
              <div className="call-to-action-2">Downtown Greenville has an awesome variety of restaurants that will please your palate every time!
              </div>
              <div className="call-to-action-3">So what are you waiting for, what are you IN THE MOOD for?</div>
              <button onClick={this.handleNav} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect pull-left" type="submit" value="Beam Me Up!">Start Here!</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = {
  LandingContainer: LandingContainer
}
