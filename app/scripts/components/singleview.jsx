var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

var models = require('../models/business');
var User= require('../parseUtilities').User;


var GoogleMap = require('react-google-maps');
var Marker = require('react-google-maps');
var SearchBox =  require('react-google-maps');

var MapComponent = require('react-cartographer/lib/components/Map');


console.log(GoogleMap);


var SpecialsList = React.createClass({
  render: function(){
    var specialsListItems = this.props.specials.map(function(special){
      return (
        <li key={special.cid} className="detailview-specials-rows">
          <div className="specials-header">
            <span className="specials-name">{special.get('name')}</span>
            <span className="specials-pric">{special.get('price')}</span>
          </div>
          <div className="specials-description">{special.get('description')}</div>
          <div className="specials-dates">
            <span className="specials-start-date">From:  {special.get('effectivedate')}</span>
            <span className="specials-end-date">Until:  {special.get('expirydate')}</span>
          </div>
        </li>
      )
    });
    console.log('specialslistitems', specialsListItems);
    return (
      <div className="col-md-8 detailview-specials-table">
        <h2 className="well">Specials</h2>
        <ul>
            {specialsListItems}
          </ul>
      </div>
    )
  }
});

var MenuList = React.createClass({
  render: function(){

    var appetizersListItems = this.props.appetizers.map(function(appetizer){
      return (
        <li key={appetizer.cid} className="detailview-menu-rows">
          <div className="appetizer-header">
            <span className="appetizer-name">{appetizer.get('name')}</span>
            <span className="appetizer-price">{appetizer.get('price')}</span>
          </div>
          <div className="appetizer-description">{appetizer.get('description')}</div>
        </li>
      )
    });

    var maincourseListItems = this.props.maincourses.map(function(maincourse){
      return (
        <li key={maincourse.cid} className="detailview-menu-rows">
          <div className="maincurse-header">
            <span className="maincourse-name">{maincourse.get('name')}</span>
            <span className="maincourse-price">{maincourse.get('price')}</span>
          </div>
          <div className="maincourse-description">{maincourse.get('description')}</div>
        </li>
      )
    });

    var dessertsListItems = this.props.desserts.map(function(dessert){
      return (
        <li key={dessert.cid} className="detailview-menu-rows">
          <div className="dessert-header">
            <span className="dessert-name">{dessert.get('name')}</span>
            <span className="dessert-price">{dessert.get('price')}</span>
          </div>
          <div className="dessert-description">{dessert.get('description')}</div>
        </li>
      )
    });

    return (
      <div className="col-md-8 detailview-menu-list">
        <h2 className="well">Menu</h2>
          <ul>
            <h3>Appetizers</h3>
              {appetizersListItems}
              <h3>Main Course</h3>
              {maincourseListItems}
              <h3>Desserts</h3>
              {dessertsListItems}
          </ul>
      </div>
    )
  }
});

var DetailView = React.createClass({
  getInitialState: function(){
    return {
      restaurant: '',
    }
  },

  handleFavorite: function(e){
    e.preventDefault();
    var self = this;
    var favorite = self.props.restaurant.get('objectId');
    console.log('My Favorite>>', favorite);
    self.props.setFavorite(favorite);
    self.setState({restaurants: favorite})
  },


  render: function(){
    var self = this;
    var restaurant = self.props.restaurant;
    var specials = restaurant.get('specials');
    var geolocation = restaurant.get('lat') + ',' + restaurant.get('long');
    console.log(geolocation);
    var googleMap = 'https://maps.googleapis.com/maps/api/staticmap?center='+ geolocation + '&zoom=16&size=250x250&scale=2&maptype=roadmap&markers=icon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=restaurant%257C996600%7C'+geolocation+ '&key=AIzaSyAf8NIWecbThX7FKm5y5cQlFd5wGeBjhoU';
    console.log(googleMap);
    var directions = 'https://www.google.com/maps/dir//'+geolocation;
    // var test = this.props.

    return(
      <div className="row-fluid detailview-pane">
        <div className="col-md-12 detailview-header">
          <div className="col-md-4 detailview-header-img">
            <img src={restaurant.get('image_upload')}></img>
          </div>
          <div className="col-md-8 detailview-header-text">
            <h1 className="detailview-header-name">
              {restaurant.get('name')}
            </h1>
            <h4 className="detailview-header-cat">
              {restaurant.get('mainCategory')}
            </h4>
            <h5 className="detailview-header-cat">
              {restaurant.get('subCategory')}
            </h5>
            <h5 className="detailview-phone">{restaurant.get('phone')}</h5>
            <img src={restaurant.get('rating_img_url')} className="detailview-header-review-img"></img>
            <button onClick={this.handleFavorite} value="favorite" type="button" className="btn btn-outline-success"></button>
          </div>
        </div>
        <div className="col-md-4 detailview-pane">
          <div className="detailview-description">
            <p>{restaurant.get('description')}</p>
          </div>
          <div className="detailview-description">
            <img src={restaurant.get('snippet_image_url')}/>
            <p>{restaurant.get('snippet_text')}</p>
          </div>
          <div className="detailview-location-pane">
            <a href={directions}><img src={googleMap}/></a>
            <p>Click on map for directions</p>
            <h5>Address</h5>
            <p>{restaurant.get('address')}</p>
            <p>{restaurant.get('city')}, {restaurant.get('state')}, {restaurant.get('zip')}</p>
          </div>
        </div>
      </div>
    )
  }
});


var SingleViewContainer = React.createClass({
  getInitialState: function(){
    return {
      restaurant: new models.Business()
    }
  },
  componentWillMount: function(){
    var restaurant = this.state.restaurant;
    console.log('this state business', this.state.restaurant);
    console.log('willmount', restaurant);
    var restaurantId = this.props.businessId;
    console.log('restaurant id', restaurantId)
    if(!restaurantId){
      return;
    }
    restaurant.set('objectId', restaurantId);
    restaurant.fetch().then(()=>{
      this.setState({restaurant: restaurant});
    });
  },

  setFavorite: function(favorite){
    var self = this;
    var restaurant = this.state.restaurant;
    // console.log(business.get('lat'));
    var currentUser = User.current().get('objectId');
    restaurant.set('favorite', {"__op": "AddRelation", "objects": [ {__type: "Pointer", className: "_User", objectId: currentUser} ] } );
    restaurant.save();
    console.log(this.state);
  },

  render: function(){
    var test = this.state.restaurant.get('name');
    var specials = this.state.restaurant.get('specials');
    var appetizers = this.state.restaurant.get('appetizer');
    var maincourses = this.state.restaurant.get('maincourse');
    var desserts = this.state.restaurant.get('dessert');

    return (
      <div>
        <DetailView restaurant={this.state.restaurant} setFavorite={this.setFavorite} specials={specials}/>
        <SpecialsList specials={specials}/>
        <div className="menu-pane">
          <MenuList appetizers={appetizers} maincourses={maincourses} desserts={desserts}/>
        </div>
      </div>
    )
  },
});

module.exports = {
  SingleViewContainer: SingleViewContainer
};
