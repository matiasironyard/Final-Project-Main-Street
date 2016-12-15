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

  navigate: function(){
    localStorage.removeItem('name');
    },

  render: function(){
    var moodFor = "for" +  ' ' + localStorage.getItem('name');
    var classStyle = "nav-header-1";
    if(localStorage.getItem('name') == null){
      classStyle = "hidden";
    }

    return (
      <div className="template">


          <div className="nav-bar row">
            <div className="nav-bar-col col-md-12-fluid col-sm-11-fluid col-xs-11-fluid">
              <ul className="nav nav-tabs ">
                <li role="presentation" className="active col-md-3"><a  onClick={this.navigate}  className="nav-tabs" href="#restaurants/">
                  <div className="nav-headers">
                  {/*<div className="nav-header-img col-md-2"/>*/}
                      <span className="nav-header-1">In The</span>
                      <span className="nav-header-2"> Mood<i className="material-icons">restaurant_menu</i></span>
                      <p className={classStyle}>{moodFor}</p>
                  </div>
                  </a>
                </li>

                <li role="presentation" className="dropdown  pull-right">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    <i className="material-icons md-48">account_box</i><span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li  className="nav-bar-dropdowns" role="presentation"><a  onClick={this.navigate} href="#favorites/"><i className="material-icons">favorite</i></a></li>
                    <li className="nav-bar-dropdowns" role="presentation"><a onClick={this.logout} href=""><i className="material-icons">exit_to_app</i></a></li>
                    <li className="nav-bar-dropdowns" role="presentation"> <a href="#login/"><i className="material-icons">perm_identity</i></a></li>
                    <li className="nav-bar-dropdowns" role="presentation"><a  href="#dashboard/"><i className="material-icons">web</i></a></li>
                  </ul>
                </li>
              </ul>{/*end of nav nav-tabs*/}
            </div>{/*end of nav-bar-col*/}
          </div>{/*end of nav-bar-row*/}


      <div className="components row">
        <div >
          {this.props.children}
        </div>
      </div>

      <div className="footer row">
        <div className="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1">
          <span>© Copyright 2016 IN THE MOOD</span>
          <a href="https://www.yelp.com/greenville">
            <img className="pull-right" src="https://s3-media2.fl.yelpcdn.com/assets/srv0/developer_pages/95212dafe621/assets/img/yelp-2c.png" width="50"/>
            <span className="pull-right">restaurant data by</span>
          </a>
        </div>
      </div>

    </div>
    )
  }
});

module.exports = Template;
