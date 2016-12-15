var React = require('react');
var Backbone = require('backbone');
var models = require('../models/business.js');
var ParseCollection = require('../models/business.js').ParseCollection;
var BusinessCollection = require('../models/business.js').BusinessCollection;
var YelpBusiness = require('../models/business.js').YelpBusiness;
var User = require('../parseUtilities').User;
var FileModel = require('../models/uploads.js').File;
var DashboardContainer = require('./dashboard.jsx').DashboardContainer;
var Dashboard = require('./dashboard.jsx').Dashboard;
var SpecialsForm = require('./dashboard.jsx').SpecialsForm;
var yelpBusiness = new YelpBusiness();
var phoneFormatter = require('phone-formatter');


require('../router').router;

var RegistrationForm = React.createClass({
  getInitialState: function() {
    return this.props.business.toJSON();
  },

  componentWillReceiveProps: function(newProps) {
    this.setState(newProps.business.toJSON());
  },

  handleInputChange: function(e) {
    e.preventDefault();
    var target = e.target;
    var newState = {};
    newState[target.name] = target.value;
    this.setState(newState);
    // console.log(target.value);
  },

  handlePicture: function(e) {
    e.preventDefault();
    var attachedPicture = e.target.files[0];
    this.props.uploadPicture(attachedPicture);
    this.setState({
      attachedPicture : attachedPicture,
    });
  },

  handleMenu: function(e) {
    e.preventDefault();
    var attachedMenu = e.target.files[0];
    this.props.uploadMenu(attachedMenu);
    this.setState({
      menu: attachedMenu
    });
    console.log(attachedMenu);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.saveBusiness(this.state);
    // console.log('SUBMIT', this.state);
  },
  render: function() {
    return (
      <div className="registration-container container-fluid">

        <div className="registration-form mdl-shadow--8dp col-md-6 col-md-offset-3 col-sm-11 col-xs-12">
          <div className="login-headers row">
          {/*<div className="nav-header-img col-md-2"/>*/}
              <span className="login-header-1">In The</span>
              <span className="login-header-2"> Mood<i className="material-icons">restaurant_menu</i></span>
              <span className="login-header-1">For {this.state.name}</span>
          </div>
          <h5>Verify Your Information</h5>
          <form onSubmit={this.handleSubmit} id="registration-form" action="https://matias-recipe.herokuapp.com/classes/dist/" method="POST" encType="multipart/form-data">
            <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
              <input onChange={this.handleInputChange} name="name" value={this.state.name} type="text" className="mdl-textfield__input" id="business-name" placeholder="Restaurant Name"/>
            </div>
            <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label categories">
              <input onChange={this.handleInputChange} name="subCategory1" value={this.state.mainCategory} type="text" className="mdl-textfield__input" id="business-cat" placeholder="Main Category"/>
              <input onChange={this.handleInputChange} name="subCategory2" value={this.state.subCategory } type="text" className="mdl-textfield__input" id="business-cat" placeholder="Sub Category"/>
            </div>
            <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
              <input onChange={this.handleInputChange} name="phone" value={this.state.phone} type="text" className="mdl-textfield__input" id="business-phone" placeholder="Your buisness phone number. 864-111-2233"/>
            </div>
            <div className="address-form">
              <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
                <input onChange={this.handleInputChange} name="address" value={this.state.address} type="text" className="mdl-textfield__input" id="business-address" placeholder="Street Address"/>
              </div>
              <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
                <input onChange={this.handleInputChange} name="city" value={this.state.city} type="text" className="mdl-textfield__input inline" id="business-city" placeholder="City"/>
              </div>
              <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
                <input onChange={this.handleInputChange} name="state" value={this.state.state} type="text" className="mdl-textfield__input inline" id="business-state" placeholder="State"/>
              </div>
              <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
                <input onChange={this.handleInputChange} name="zip" value={this.state.zip} type="text" className="mdl-textfield__input inline" id="business-zip" placeholder="Zip Code"/>
              </div>
            </div>
            <div className="registration-description row">
              <div className="registration-description col-md-12 col-sm-11 col-xs-11">
                <h4>About {this.state.name} </h4>
                <p>Tell your patrions about your business</p>
                <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
                  <textarea onChange={this.handleInputChange} name="description" value={this.state.description} type="text" className="mdl-textfield__input" id="business-name" placeholder="Enter a short business description"/>
                </div>
              </div>
            </div>

            <div className="registration-image-uploads row">
              <div className="registration-image-uploads-header col-md-12 col-sm-11 col-xs-11">
                <h4>Images Uploads</h4>
              </div>
              <div className="form-profile-pic col-md-6">
                <div><img src={this.state.image_upload} width="300"/></div>
                <input type="text" id="uploaded_picture" placeholder="Header Picture Title"/><br/>
                <input className="" onChange={this.handlePicture} type="file" id="profile-pic"/>
              </div>
              <div className="form-profile-pic col-md-6">
                <div><img src={this.state.menu_upload} width="300"/></div>
                <input type="text" id="uploaded_menu"placeholder="About Picture Title"/><br/>
                <input className="" onChange={this.handleMenu} type="file" id="menu"/>
              </div>
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

var RegistrationContainer = React.createClass({
  getInitialState: function() {
    return {
      business: new models.Business(),
    };
  },

  componentWillMount: function() {
    var self = this;
    var businessCollection = new BusinessCollection();
    businessCollection.parseWhere('owner', '_User', User.current().get('objectId')).fetch().then(function(response) {
      if (businessCollection.length >= 1) {
        self.setState({
          'business': businessCollection.first()
        });
        // console.log(businessCollection.parseWhere());
      } else {
        yelpBusiness.fetch().then(function(response) {
          console.log('response', response.businesses[0]);
          console.log('categories', response.businesses[0].categories[0]);
          var mainCategory = response.businesses[0].categories[0] ? response.businesses[0].categories[0].title : "no main category from Yelp";
          var subcategory = response.businesses[0].categories[0] ? response.businesses[0].categories[0].alias : "no subcategory from Yelp";
          var open = response.businesses[0].is_closed ? response.businesses[0].is_closed = false : "currently open";
          console.log('open:', open);
          var business = new models.Business();
          var data = response.businesses[0];
          console.log('photos', data);
          var phone = phoneFormatter.format(data.phone.slice(2),  "(NNN) NNN-NNNN");
          console.log('phone', phone);
          business.set({
              name: data.name,
              id: data.id,
              image_url: data.image_url,
              phone: phone,
              is_closed: open,
              rating_img_url: data.rating_img_url_large,
              address: data.location.address1,
              city: data.location.city,
              state: data.location.state,
              zip: data.location.zip_code,
              mainCategory: mainCategory,
              subCategory: subcategory,
              menuUrl: 'https://www.yelp.com/menu/' + data.id,
              lat: data.coordinates.latitude,
              long: data.coordinates.longitude,
              snippet_text: data.snippet_text,
              snippet_image_url: data.snippet_image_url,
              url: data.url,
              price: data.price,
              rating: data.rating,
            }),
            self.setState({
              business: business
            });
        });
      }
    });
  },

  componentWillReceiveProps: function() {
    this.getBusiness();
  },
  getBusiness: function() {
    var business = this.state.business,
      businessId = this.props.businessId;
    if (!businessId) {
      return;
    }
    business.set('objectId', businessId);
    business.fetch().then(() => {
      this.setState({
        business: business
      });
    });
  },

  saveBusiness: function(businessData) {
    var self = this;
    var business = this.state.business;
    // console.log(business.get('lat'));
    var currentUser = User.current().get('objectId');
    // console.log('save biz/current user object ID', currentUser);
    // console.log('SAVE', businessData);
    business.set(businessData);
    business.set('image_upload', localStorage.getItem('image_upload'));
    business.set('menu_upload', localStorage.getItem('menu_upload'));
    business.set('owner', {
      __type: "Pointer",
      className: "_User",
      objectId: currentUser
    });
    business.save().then(function() {
      self.props.router.navigate('dashboard/', {
        trigger: true
      })
    });
    console.log('save', this.state);
  },

  uploadPicture: function(picture) {
    var self = this;
    var file = new FileModel();
    var business = this.state.business;
    file.set('name', picture.name);
    file.set('data', picture);
    file.save().done(function(response) {
      localStorage.setItem('image_upload', response.url);
    });
  },

  uploadMenu: function(menu) {
    var file = new FileModel();
    // var business = this.state.business;
    file.set('name', menu.name);
    file.set('data', menu);
    file.save().done(function(response) {
      localStorage.setItem('menu_upload', response.url);
      // business.set('menu_upload', response.url);
    });
  },

  render: function() {
    // console.log('container state',this.state);
    return (
      <RegistrationForm business={this.state.business} saveBusiness={this.saveBusiness} uploadPicture={this.uploadPicture} uploadMenu={this.uploadMenu}/>
    )
  }
});

module.exports = {
  RegistrationContainer: RegistrationContainer,
};

// phone number format pattern='\d{3}[\-]\d{3}[\-]\d{4}
