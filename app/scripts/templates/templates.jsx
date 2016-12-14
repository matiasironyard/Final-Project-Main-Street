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
        <div className="menu container-fluid">
          <div className="row">
            <div className="nav-bar-col col-md-12-fluid col-sm-11-fluid col-xs-11-fluid">
              <div className="nav-headers  col-md-2 col-sm-2 hidden-xs">
                <span className="nav-header-1">In The</span>
                <p className="nav-header-2">Mood</p>
              </div>
              <ul className="nav nav-tabs col-md-10-fluid col-sm-10-fluid">
                <li role="presentation" className="active"><a  className="nav-tabs" href="#restaurants/"><i className="material-icons">restaurant</i></a></li>
                <li className="active" role="presentation"><a className="nav-tabs" href="#favorites/"><i className="material-icons">favorite</i></a></li>
                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-default btn-xs dropdown-toggle " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Gravatar className="avatar img-thumbnail pull-right" email={localStorage.getItem('username')} size={45} />
                  </button>
                  <ul className="dropdown-menu pull-right">
                    {/*<li className="nav-bar-dropdowns" role="presentation"><p className="pull-right"> {localStorage.getItem('username')}</p></li>*/}
                    <li className="nav-bar-dropdowns" role="presentation"><a onClick={this.logout} href=""><i className="material-icons">exit_to_app</i></a></li>
                    <li className="nav-bar-dropdowns" role="presentation"> <a href="#login/"><i className="material-icons">perm_identity</i></a></li>
                    <li className="nav-bar-dropdowns" role="presentation"><a  href="#dashboard/"><i className="material-icons">web</i></a></li>
                  </ul>
                </div>
              </ul>
            </div>
          </div>
        </div>

      <div className="components container">
        <div className="row">
          {this.props.children}
        </div>
      </div>


        <div className="footer row">
          <div className="col-md-11 col-xs-11 col-xs-11">
            <span className="col-md-offset-1 pull-left">Copyright © IN THE MOOD 2016</span>
            <img className="pull-right"src="https://s3-media2.fl.yelpcdn.com/assets/srv0/developer_pages/95212dafe621/assets/img/yelp-2c.png" width="50"/>
          </div>
        </div>

    </div>
    )
  }
});

module.exports = Template;
