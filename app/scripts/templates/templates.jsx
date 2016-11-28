var React = require('react');

function Template(props){
    return (
      <div>
        <div className="container">
          <div className="menu row">
            <div className="col-md-11-fluid nav-bar-col">
              <a href="#"><div className="facebook"></div></a>
                <ul className="nav nav-tabs">
                  <li><span className="nav-name">{localStorage.getItem('username')},</span><span className="nav-message"> Welcome!  </span></li>
                  <li role="presentation" className="active"><a  href="#restaurants/">Home</a></li>
                  <li role="presentation"> <a href="">Log In</a></li>
                  <li role="presentation"><a href="">Log Out</a></li>
                </ul>
            </div>
            <div className="col-md-12 header-col">
              <div className="header-title">
                <h2 className="restaurant-name">Greenville Foodies</h2>
              </div>
            </div>
            <div className="components">
              {props.children}
            </div>
          </div>
          <div className="col-md-12-fluid footer-col">
            <span className="footer-title">Greenville Foodies</span> <p>Copyright © Greenville Foodies 2016</p>
          </div>
        </div>
      </div>
    )
  }


module.exports = Template;
