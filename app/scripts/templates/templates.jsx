var React = require('react');
require('backbone-react-component');
var Gravatar = require('react-gravatar');
var _ = require('underscore');



var Template = React.createClass({
  logout: function(){
    localStorage.clear().then(function(){
        $.post('https://matias-recipe.herokuapp.com/logout/')
    });
  },

  render: function(){
    return (
      <div className="template">
        <div className="menu">
          <div className="nav-bar-col col-md-12 col-sm-11 col-xs-11">
            <h2 className="nav-header">Greenville Foodies</h2>
            <ul className="nav nav-tabs">
              <li role="presentation" className="active"><a  href="#restaurants/"><i className="material-icons">restaurant</i></a></li>
              <li className="active" role="presentation"><a href="#favorites/"><i className="material-icons">favorite</i></a></li>
                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-default btn-xs dropdown-toggle " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Gravatar className="avatar img-thumbnail pull-right" email={localStorage.getItem('username')} size={50} />
                  </button>
                    <ul className="dropdown-menu pull-right">
                      <li className="nav-bar-dropdowns" role="presentation"><a onClick={this.logout} href=""><i className="material-icons">exit_to_app</i></a></li>
                      <li className="nav-bar-dropdowns" role="presentation"> <a href="#login/"><i className="material-icons">perm_identity</i></a></li>
                      <li className="nav-bar-dropdowns" role="presentation"><a  href="#dashboard/"><i className="material-icons">web</i></a></li>
                    </ul>
                  </div>
            </ul>
              <div className="nav-message nav-bar-dropdowns">
                <span>Logged in as </span><span className="nav-name">{localStorage.getItem('username')}</span>
              </div>
          </div>
        </div>
          <div className="components">
            {this.props.children}
          </div>

        <div className="footer-row">
          <div className="footer col-md-12 col-sm-11 col-xs-11">
            <div className="col-md-5 col-md-offset-4 col-xs-5 col-xs-offset-4">
              <span>Copyright © Greenville Foodies 2016</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Template;
