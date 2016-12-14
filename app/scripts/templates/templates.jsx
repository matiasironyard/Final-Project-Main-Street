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
        <div className="nav-bar container-fluid">

          <div className="nav-bar row">
            <div className="nav-bar-col col-md-12-fluid col-sm-11-fluid col-xs-11-fluid">
              <ul className="nav nav-tabs ">
                <li role="presentation" className="active col-md-3"><a  className="nav-tabs" href="#restaurants/">
                  <div className="nav-headers">
                  {/*<div className="nav-header-img col-md-2"/>*/}
                      <span className="nav-header-1">In The</span>
                      <span className="nav-header-2"> Mood<i className="material-icons">restaurant_menu</i></span>
                  </div>
                  </a>
                </li>
                                    {/*<li className="nav-bar-dropdowns" role="presentation"><p className="pull-right"> {localStorage.getItem('username')}</p></li>*/}
                <li role="presentation" className="dropdown  pull-right">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    <i className="material-icons md-48">account_box</i><span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li  className="nav-bar-dropdowns" role="presentation"><a  href="#favorites/"><i className="material-icons">favorite</i></a></li>
                    <li className="nav-bar-dropdowns" role="presentation"><a onClick={this.logout} href=""><i className="material-icons">exit_to_app</i></a></li>
                    <li className="nav-bar-dropdowns" role="presentation"> <a href="#login/"><i className="material-icons">perm_identity</i></a></li>
                    <li className="nav-bar-dropdowns" role="presentation"><a  href="#dashboard/"><i className="material-icons">web</i></a></li>
                  </ul>
                </li>
              </ul>{/*end of nav nav-tabs*/}
            </div>{/*end of nav-bar-col*/}
          </div>{/*end of nav-bar-row*/}
        </div>{/*nav-bar container-fluid*/}

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
