var React = require('react');
var Backbone = require('backbone');
var models = require('../models/business.js');
var ParseCollection = require('../models/business.js').ParseCollection;
var YelpBusiness = require('../models/business.js').YelpBusiness;


var RegistrationForm = React.createClass ({
  getInitialState: function(){
    return {
      business: this.props.business.toJSON(),
      name: '',
    }
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.business.toJSON());
  },

  handleInputChange: function(e){
    e.preventDefault();
    var target = e.target;
    var newState = {};
    newState[target.name]  = target.value;
    this.setState(newState);
    console.log(target.value);
  },

  handleSubmit: function(e){
    e.preventDefault();
    this.props.saveBusiness(this.state);
    console.log('SUBMIT', this.state);
  },
  render: function(){
    var self = this;
    var yelpData = self.props.yelpBusinessData;
    if(yelpData != undefined){
      console.log(yelpData);
      var name = yelpData.get('name');
      var categories = yelpData.get('categories');
      // console.log(categories);
      var category1 = categories[0];
      var category2 = categories[1];
      var subCategory1 = category1[0];
      var subCategory2 = category2[1];
      console.log(subCategory1, subCategory2);
      var phone = yelpData.get('display_phone').slice(3);
      var isClosed = yelpData.get('is_closed');
      var imgUrl = yelpData.get('image_url');
      var location = yelpData.get('location');
      var address= location.display_address[0];
      var city = location.city;
      var state = location.state_code;
      var zip = location.postal_code;
      var rating = yelpData.get('rating_img_url')
      console.warn(city);
      var menuUrl = 'https://www.yelp.com/menu/'+yelpData.get('id');
      // var home = this.state.formData;
      // home['address']=streetAddress + city;
      // home['img']= imgUrl;
      // console.log(home);
      // console.log(home.img);
    }
    return (
      <div className="registration-form col-md-5 col-md-offset-3">
        <div className="form-header">
          <img src={imgUrl}/>
          <h2>{name}</h2>
        </div>
        <h4>Registration Form</h4>
        <p>Verify Your Information</p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input onChange={this.handleInputChange} name="name"  ref = "myTextInput" value={this.state.name} type="text" className="form-control" id="business-name" placeholder="name"/>
            </div>
            <div className="form-group categories">
              <label htmlFor="categores">Categories</label>
              <input onChange={this.handleInputChange} name="subCategory1" value={this.state.subCategory1 || subCategory1} type="text" className="form-control" id="business-cat" placeholder="Main Category"/>
              <input onChange={this.handleInputChange} name="subCategory2" value={this.state.subCategory2 || subCategory2} type="text" className="form-control" id="business-cat" placeholder="Sub Category"/>
            </div>
            <div className="form-group">
              <label htmlFor="name">Menu</label>
              <input onChange={this.handleInputChange} name="menuUrl" value={this.state.menuUrl ||menuUrl} type="text" className="form-control" id="business-phone" placeholder="Menu Address"/>
            </div>
            <div className="form-group">
              <label htmlFor="name">Phone</label>
              <input onChange={this.handleInputChange} name="phone" value={this.state.phone ||phone} type="text" className="form-control" id="business-phone" placeholder="Phone"/>
            </div>
            <div className="address-form">
              <div className="form-group">
                <label htmlFor="name">Address</label>
                <input onChange={this.handleInputChange} name="address" value={this.state.address || address} type="text" className="form-control" id="business-address" placeholder="Street Address"/>
              </div>
              <div className="form-group">
                <label htmlFor="name"></label>
                <input onChange={this.handleInputChange} name="city" value={this.state.city || city} type="text" className="form-control inline" id="business-city" placeholder="City"/>
              </div>
              <div className="form-group">
                <label htmlFor="name"></label>
                <input onChange={this.handleInputChange} name="state" value={this.state.state || state} type="text" className="form-control inline" id="business-state" placeholder="State"/>
              </div>
              <div className="form-group">
                <label htmlFor="name"></label>
                <input onChange={this.handleInputChange} name="zip" value={this.state.zip || zip} type="text" className="form-control inline" id="business-zip" placeholder="Zip Code"/>
              </div>
            </div>
            <div className='button-pane'>
              <button type="submit" className="btn btn-default">Save Profile</button>
            </div>
          </form>
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
      // console.warn('YELP FETCH CONTAINTER', yelpBusiness);
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

  saveBusiness: function(businessData){
    var business = this.state.business;
    console.log('SAVE', businessData);
    business.set(businessData);
    business.save();
  },

render: function (){
  return (
    <div>
      <RegistrationForm yelpBusinessData={this.state.yelpBusiness} business={this.state.business} saveBusiness={this.saveBusiness}/>
    </div>
  )
}
});

module.exports = {
  RegistrationContainer: RegistrationContainer,
};
