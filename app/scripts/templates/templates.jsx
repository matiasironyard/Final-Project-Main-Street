var React = require('react');


var Template = React.createClass({
  logout: function(){
    $.post('https://https://matias-recipe.herokuapp.com/logout/').then(function(){
      localStorage.clear();
    });
  },
  render: function(){
    return (
      <div className="container">
        <div className="menu row">
          <div className="col-md-11-fluid nav-bar-col">
            <h2 className="restaurant-name">Greenville Foodies</h2>
            <a href="#"><div className="facebook"></div></a>
              <ul className="nav nav-tabs">
                <li role="presentation" className="active"><a  href="#restaurants/">Home</a></li>
                <li className="pull-right" role="presentation"><a onClick={this.logout} href="">Log Out</a></li>
                <li className="pull-right" role="presentation"> <a href="">Log In</a></li>
              </ul>
              <div className="nav-message pull-right">
                <span>Logged in as </span><span className="nav-name">{localStorage.getItem('username')}</span>
              </div>
          </div>
          {/*<div className="col-md-12 header-col">
            <div className="header-title">
              <h2 className="restaurant-name">Greenville Foodies</h2>
            </div>
          </div>*/}
          <div className="components">
            {this.props.children}
          </div>
        </div>
        <div className="col-md-12-fluid footer-col">
          <span className="footer-title">Greenville Foodies</span> <p>Copyright © Greenville Foodies 2016</p>
        </div>
      </div>
    )
  }
});

module.exports = Template;
