var React = require('react');
var Backbone = require('backbone');
var models = require('../models/business.js');
var ParseCollection = require('../models/business.js').ParseCollection;
var YelpBusiness = require('../models/business.js').YelpBusiness;


var RegistrationForm = React.createClass ({
  getInitialState: function(){
    return {
      name: '',
      phone: '',

    };
  },
  componentWillReceiveProps: function(newProps){
    this.setState(newProps.yelpBusinessData);
  },

  render: function(){
    var self = this;
    var yelpData = self.props.yelpBusinessData;
    if(yelpData != undefined){
      console.log('this works', yelpData.get('location'));
      this.state.name = yelpData.get('name');
      this.state.phone = yelpData.get('display_phone');
      // this.state.phone = yelpData.get('display_phone');
    }



    // var collection = new Backbone.Collection(yelpBusinessData);
    // console.log('collection', collection.get('name'));
    // var name = yelpBusinessData.attributes;
    // console.log(name);

    return (
      <div>
        <h2>Business Information</h2>
        <p>Business Name: {this.state.name}</p>
        <input value={this.state.phone}>Business phone: </input>
      </div>
    )
  }
});


var RegistrationContainer = React.createClass ({
  getInitialState: function(){
    return {
      business: new models.Business(),
    };
  },
  componentWillMount: function(){
    var self = this;
    this.getBusiness();
    var yelpBusiness = new YelpBusiness();
    // console.log(yelpBusiness)
    // var data = yelpBusiness.fetch();
    yelpBusiness.fetch().then(function(){
      self.setState({yelpBusiness: yelpBusiness});
      console.warn('YELP FETCH CONTAINTER', yelpBusiness);
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

render: function (){
  return (
    <div>
      <h1>Registration Form</h1>
      <RegistrationForm yelpBusinessData={this.state.yelpBusiness}/>
    </div>
  )
}
});

module.exports = {
  RegistrationContainer: RegistrationContainer,
};
