var React = require('react');
var Backbone = require('backbone');




var Dashboard = React.createClass({


  render: function(){
    console.log(this.props.business);
    return(
      <div className="dashboard-container col-md-4 col-md-offset-1">
        <h1>Business Dashboard</h1>
          <ul>
            <li>Name</li>
            <li>Phone</li>
            <li>Address</li>
          </ul>
      </div>
    )
  }
});

var Specials = React.createClass({
  render: function(){
    return(
      <div className="spcials col-md-7">
        <h3>Specials</h3>
        <h4>Enter Specials Here</h4>
      </div>
    )
  }

});

var DashboardContainer = React.createClass({
  render: function(){
    return(
      <div>
        <h1>Dashboard</h1>
        <Dashboard/>
        <Specials/>
      </div>
    )
  }
});

module.exports = {
  DashboardContainer: DashboardContainer
}
