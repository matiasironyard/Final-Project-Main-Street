var React = require('react');
var Backbone = require('backbone');
var models = require('../models/business.js');
var ParseCollection = require('../models/business.js').ParseCollection;
var BusinessCollection = require('../models/business.js').BusinessCollection;
var YelpBusiness = require('../models/business.js').YelpBusiness;
var User= require('../parseUtilities').User;
var FileModel = require('../models/uploads.js').File;
var DashboardContainer = require('./dashboard.jsx').DashboardContainer;
var Dashboard= require('./dashboard.jsx').Dashboard;
var SpecialsForm = require('./dashboard.jsx').SpecialsForm;
var yelpBusiness = new YelpBusiness();
require('../router').router;


var RegistrationForm = React.createClass ({
  getInitialState: function(){
    return this.props.business.toJSON();
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
    // console.log(target.value);
  },

  handlePicture: function(e){
    e.preventDefault();
    var attachedPicture = e.target.files[0];
    this.props.uploadPicture(attachedPicture);
    this.setState({profilePic: attachedPicture});
    // console.log(attachedPicture);
  },

  handleMenu: function(e){
    e.preventDefault();
    var attachedMenu = e.target.files[0];
    this.props.uploadMenu(attachedMenu);
    this.setState({menu: attachedMenu});
    console.log(attachedMenu);
  },

  handleSubmit: function(e){
    e.preventDefault();
    this.props.saveBusiness(this.state);
    // console.log('SUBMIT', this.state);
  },
  render: function(){
    return (
      <div className="registration-form col-md-6 col-md-offset-3">
        <div className="form-header col-md-12">
          <img src={this.state.image_url}/>
          <h2>{this.state.name}</h2>
          <h4>{this.state.mainCategory}</h4>
          <h5>{this.state.phone}</h5>
        </div>
        <div className="form-container">
          <h4>Registration Form</h4>
          <p>Verify Your Information</p>
            <form onSubmit={this.handleSubmit} id="registration-form" action="https://matias-recipe.herokuapp.com/classes/dist/" method="POST" encType="multipart/form-data">
              <div className="form-profile-pic">
                <input type="text" id="uploaded_picture"/><br/>
                <input onChange={this.handlePicture} type="file" id="profile-pic"/>
              </div>
              <div className="form-profile-pic">
                <input type="text" id="uploaded_menu"/><br/>
                <input onChange={this.handleMenu} type="file" id="menu"/>
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input onChange={this.handleInputChange} name="name" value={this.state.name} type="text" className="form-control" id="business-name" placeholder="name"/>
              </div>
              <div className="form-group categories">
                <label htmlFor="categores">Categories</label>
                <input onChange={this.handleInputChange} name="subCategory1" value={this.state.mainCategory} type="text" className="form-control" id="business-cat" placeholder="Main Category"/>
                <input onChange={this.handleInputChange} name="subCategory2" value={this.state.subCategory } type="text" className="form-control" id="business-cat" placeholder="Sub Category"/>
              </div>
              <div className="form-group">
                <label htmlFor="name">Description</label>
                <textarea onChange={this.handleInputChange} name="description" value={this.state.description} type="text" className="form-control" id="business-name" placeholder="Enter a short business description"/>
              </div>
              <div className="form-group">
                <label htmlFor="name">Menu</label>
                <input onChange={this.handleInputChange} name="menuUrl" value={this.state.menuUrl} type="url" className="form-control" id="business-phone" placeholder="Menu Address"/>
              </div>
              <div className="form-group">
                <label htmlFor="name">Phone</label>
                <input onChange={this.handleInputChange} name="phone" pattern='\d{3}[\-]\d{3}[\-]\d{4}' value={this.state.phone} type="text" className="form-control" id="business-phone" placeholder="864-111-2233"/>
              </div>
              <div className="address-form">
                <div className="form-group">
                  <label htmlFor="name">Address</label>
                  <input onChange={this.handleInputChange} name="address" value={this.state.address} type="text" className="form-control" id="business-address" placeholder="Street Address"/>
                </div>
                <div className="form-group">
                  <label htmlFor="name"></label>
                  <input onChange={this.handleInputChange} name="city" value={this.state.city} type="text" className="form-control inline" id="business-city" placeholder="City"/>
                </div>
                <div className="form-group">
                  <label htmlFor="name"></label>
                  <input onChange={this.handleInputChange} name="state" value={this.state.state} type="text" className="form-control inline" id="business-state" placeholder="State"/>
                </div>
                <div className="form-group">
                  <label htmlFor="name"></label>
                  <input onChange={this.handleInputChange} name="zip" value={this.state.zip} type="text" className="form-control inline" id="business-zip" placeholder="Zip Code"/>
                </div>
              </div>
              <div className="additional-registration-info">
                <h4>Additional Registration Information From Yelp</h4>
                <p>We will use the following to build your profile</p>
                <ul>
                  <li>Rating</li>
                  <li>Review Avatar</li>
                  <li>Review Snippet</li>
                  <li>Coordinates (to generate map)</li>
                  <li>Open or Close Data</li>
                </ul>
              </div>
              <div className='button-pane'>
                <button type="submit" className="btn btn-default">Save Profile</button>
              </div>
            </form>
          </div>
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
    var businessCollection = new BusinessCollection();
    businessCollection.parseWhere('owner', '_User', User.current().get('objectId')).fetch().then(function(response){
      if(businessCollection.length >= 1){
        self.setState({'business': businessCollection.first()});
        // console.log(businessCollection.parseWhere());
      } else {
        yelpBusiness.fetch().then(function(response){
          console.log('categories', response.businesses[0].categories[0]);
          var mainCategory = response.businesses[0].categories[0] ? response.businesses[0].categories[0][0] : "no main category from Yelp";
          var subcategory = response.businesses[0].categories[1] ? response.businesses[0].categories[1][0] : "no subcategory from Yelp";
          var open= response.businesses[0].is_closed ? response.businesses[0].is_closed = false: "currently open";
          console.log('open:', open);
          var business = new models.Business();
          var data = response.businesses[0];
          // console.log(data.categories[0][1]);
          business.set(
            {
              name: data.name,
              id: data.id,
              image_url: data.image_url,
              phone: data.display_phone.slice(3),
              is_closed: open,
              rating_img_url: data.rating_img_url,
              address: data.location.address[0],
              city: data.location.city,
              state: data.location.state_code,
              zip: data.location.postal_code,
              mainCategory: mainCategory,
              subCategory: subcategory,
              menuUrl: 'https://www.yelp.com/menu/'+data.id,
              lat: data.location.coordinate.latitude,
              long: data.location.coordinate.longitude,
              snippet_text: data.snippet_text,
              snippet_image_url: data.snippet_image_url,
              url: data.url,
            }
          ),
          self.setState({business: business});
        });
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

  saveBusiness: function(businessData){
    var self = this;
    var business = this.state.business;
    // console.log(business.get('lat'));
    var currentUser = User.current().get('objectId');
    // console.log('save biz/current user object ID', currentUser);
    // console.log('SAVE', businessData);
    business.set(businessData);
    business.set('image_upload', localStorage.getItem('image_upload'));
    console.log('imgupload', localStorage.getItem('image_upload'));
    business.set('menu_upload', localStorage.getItem('menu_upload'));
    business.set('owner', {__type: "Pointer", className: "_User", objectId: currentUser});
    business.save().then(function(){
        self.props.router.navigate('dashboard/', {trigger: true})
    });
    console.log('save', this.state);
  },

  uploadPicture: function(picture){
    var file = new FileModel();
    var business = this.state.business;
    // console.log(file);
    file.set('name', picture.name);
    file.set('data', picture);
    file.save().done(function(response){
      localStorage.setItem('image_upload', response.url);
      // business.set('image_upload', response.url);
    });
  },

  uploadMenu: function(menu){
    var file = new FileModel();
    // var business = this.state.business;
    file.set('name', menu.name);
    file.set('data', menu);
    file.save().done(function(response){
      localStorage.setItem('menu_upload', response.url);
      // business.set('menu_upload', response.url);
    });
  },

render: function (){
  // console.log('container state',this.state);
  return (
    <div>
      <RegistrationForm business={this.state.business} saveBusiness={this.saveBusiness} uploadPicture={this.uploadPicture} uploadMenu={this.uploadMenu}/>
    </div>
  )
}
});

module.exports = {
  RegistrationContainer: RegistrationContainer,
};
