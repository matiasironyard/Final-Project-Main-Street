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
                <li role="presentation" className="active"><a  href="#restaurants/"><i className="material-icons">home</i></a></li>
                <li className="pull-right" role="presentation"><a onClick={this.logout} href=""><i className="material-icons">exit_to_app</i></a></li>
                <li className="pull-right" role="presentation"> <a href=""><i className="material-icons">perm_identity</i></a></li>
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
          <div className="col-md-10">
            <span className="footer-title">Greenville Foodies</span> <p>Copyright © Greenville Foodies 2016</p>
          </div>
          <div className="col-md-2">
            <a  href="#dashboard/"><button className="favorite-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect pull-right"><i className="material-icons">web</i></button></a>
            <span className="pull-right">Dashboard </span>
          </div>

        </div>
      </div>
    )
  }
});

module.exports = Template;
