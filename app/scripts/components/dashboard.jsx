var React = require('react');
var Backbone = require('backbone');
var RegistrationContainer = require('../components/registration.jsx').RegistrationContainer;
var Dashboard = require('../components/registration.jsx').Dashboard;
var models = require('../models/business');
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;





var Dashboard = React.createClass({
  getInitialState: function(){
    return this.props.business.toJSON();
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.business.toJSON());
  },

  render: function(){
    var business = this.props.business;
    return(
      <div className="dashboard-container col-md-4 col-md-offset-1">
        <h1>Business Dashboard</h1>
          <ul>
            <li>{business.get('name')}</li>
          </ul>
      </div>
    )
  }
});

var Specials = React.createClass({
  getInitialState: function(){
    return this.props.business.toJSON();
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.business.toJSON());
  },

  handleInputChange: function(e){
    var target = e.target;
    // console.log('target', target);
    var newState = {};
    newState[target.name] = target.value;
    this.setState(newState);
    this.props.business.set(target.name, target.value);
  },
  handleSubmit: function(e){
  e.preventDefault();
  this.props.saveSpecial(this.state);
},

  render: function(){
    return(
      <div className="spcials col-md-7">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="test">Special</label>
            <input  onChange={this.handleInputChange} name="special"  value={this.state.test} type="text" className="form-control" id="test" placeholder="special of the day"/>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }

});

var SpecialsForm = React.createClass({
  getInitialState: function(){
  return this.props.business.toJSON();
},

componentWillReceiveProps: function(newProps){
this.setState(newProps.business.toJSON());
},
 render: function(){
   var businessSpecials = this.props.business;
 }



});



var DashboardContainer = React.createClass({
  getInitialState: function(){
    return {
      business: new models.Business()
    }
  },
  componentWillMount: function(){
    var self = this;
    var businessCollection = new BusinessCollection();
    businessCollection.parseWhere('user', '_User', User.current().get('objectId')).fetch().then(function(){
      if(businessCollection.length == 1){
        self.setState({business: businessCollection.first()});
        // console.log(businessCollection.parseWhere());
      }
    });
  },

  componentWillReceiveProps: function(){
    this.getBusiness();
  },
  getBusiness: function(){
    var business = this.state.business,
    businessId = this.props.businessId;
    if(!businessId){
      return;
    }
    business.set('objectId', businessId);
    business.fetch().then(()=> {
      this.setState({business: business});
    });
  },

  saveSpecial: function(specialData){
    var business = this.state.business;
    // console.log('recipe @ save form', recipe);
    business.set(specialData);
    business.save();
  },

  render: function(){
    console.log('dashboard state', this.state);
    return(
      <div>
        <h1>Dashboard</h1>
        <Dashboard business={this.state.business} />
        <Specials business={this.state.business} saveSpecial={this.saveSpecial}/>
      </div>
    )
  }
});

module.exports = {
  DashboardContainer: DashboardContainer,
}
