var React = require('react');


var LogInTemplate = React.createClass({
  logout: function(){
    localStorage.clear().then(function(){
        $.post('https://matias-recipe.herokuapp.com/logout/')
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
                <li role="presentation" className="active"><a><i className="material-icons">restaurant</i></a></li>
              </ul>
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
        </div>
      </div>
    )
  }
});

module.exports = LogInTemplate;
