var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
var models = require('../models/business');
var Template = require('../templates/templates.jsx');
var User= require('../parseUtilities').User;
var Favorites= require('./favorites.jsx').FavoritesContainer;

var router = require('../router').router;
// var GoogleMaps = require('../models/business.js').GoogleMaps;
// var googleMaps = new GoogleMaps();



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
  // console.log('specialslistitems', specialsListItems);
    return (
      <div className="col-md-8 detailview-specials-table">
        <h2 className="mdl-layout-title">Specials</h2>
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

        <tr key={appetizer.cid} className="detailview-menu-rows">
          <td className="appetizer-name ">{appetizer.get('name')}</td>
          <td className="appetizer-description">{appetizer.get('description')}</td>
          <td className="appetizer-price ">{appetizer.get('price')}</td>
        </tr>
      )
    });

    var maincourseListItems = this.props.maincourses.map(function(maincourse){
      return (
        <tr key={maincourse.cid} className="detailview-menu-rows">
          <td className="maincourse-name">{maincourse.get('name')}</td>
          <td className="maincourse-description">{maincourse.get('description')}</td>
          <td className="maincourse-price">{maincourse.get('price')}</td>
        </tr>
      )
    });

    var dessertsListItems = this.props.desserts.map(function(dessert){
      return (
        <tr key={dessert.cid} className="detailview-menu-rows">
          <td className="">{dessert.get('name')}</td>
          <td className="dessert-description">{dessert.get('description')}</td>
          <td className="dessert-price">{dessert.get('price')}</td>
        </tr>
      )
    });

    return (
      <div className="col-md-8 detailview-menu-list mdl-shadow--2dp">
        <div className="row">
          <h2 className="mdl-layout-title">Menu</h2>
              <h3 className="mdl-layout-title">Appetizers</h3>
              <table className="menu col-md-11 col-md-offset-1">
                <thead>
                  <tr>
                    <th className="table-dish">Dish</th>
                    <th className="table-description">Description</th>
                    <th className="table-price">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {appetizersListItems}
                </tbody>
              </table>
            </div>

            <div className="row">
              <h3 className="mdl-layout-title">Main Course</h3>
                <table className="menu col-md-11 col-md-offset-1">
                  <thead>
                    <tr>
                      <th className="table-dish">Dish</th>
                      <th className="table-description">Description</th>
                      <th className="table-price">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maincourseListItems}
                  </tbody>
                </table>
              </div>

            <div className="row">
              <h3 className="mdl-layout-title">Desserts</h3>
                <table className="menu col-md-11 col-md-offset-1">
                  <thead>
                    <tr>
                      <th className="table-dish">Dish</th>
                      <th className="table-description">Description</th>
                      <th className="table-price">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dessertsListItems}
                  </tbody>
                </table>
              </div>
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
  // console.log('My Favorite>>', favorite);
    self.props.setFavorite(favorite);
    self.setState({favorite: favorite})
  },

  handleRemoveFavorite: function(e){
    e.preventDefault();
    var self = this;
    var favorite = self.props.restaurant.get('objectId');
    self.props.removeFavorite(favorite);
    self.setState({favorite: favorite})
  },


  render: function(){
    var self = this;
    // googleMaps.fetch().then(function(response){
    // // console.log(response);
    // });
    var restaurant = self.props.restaurant;
    var specials = restaurant.get('specials');
    var geolocation = restaurant.get('lat') + ',' + restaurant.get('long');
  // console.log(geolocation);
    var googleMap = 'https://maps.googleapis.com/maps/api/staticmap?center='+ geolocation + '&zoom=16&size=250x250&scale=2&maptype=roadmap&markers=icon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=restaurant%257C996600%7C'+geolocation+ '&key=AIzaSyAf8NIWecbThX7FKm5y5cQlFd5wGeBjhoU';
  // console.log(googleMap);
    var directions = 'https://www.google.com/maps/dir//'+geolocation;
    var imgUrl = restaurant.get('image_upload');
    var divStyle= {
      height: '40vh',
      backgroundImage: 'url(' + imgUrl + ')'
    };
    var phone = '"tel:(' + restaurant.get('phone') +')"';
    console.warn(phone);

    return(
      <div className="detailview-pane">
        <div className="detailview-header col-md-12">
          <div className="row">
            <div className="detailview-header-img" style={divStyle}>
              <button className="favorite-btn mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored " onClick={this.handleRemoveFavorite} type="submit" value="Remove Favorite"><i className="material-icons">clear</i></button>
                <button className="favorite-btn mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored " onClick={this.handleFavorite} type="button"><i className="material-icons">favorite_border</i></button>
            </div>
            <div className="detailview-header-text ">
              <h1 className="detailview-header-name">
                {restaurant.get('name')}
              </h1>
              <img src={restaurant.get('rating_img_url')} className="detailview-header-review-img"></img>
              <div className="detailview-header-cat">
                {restaurant.get('mainCategory')}
              </div>
              <div className="detailview-header-cat">
                {restaurant.get('subCategory')}
              </div>
            </div>
            <div className="detailview-header-info">
              <div className="detailview-phone"><i className="material-icons">phone</i><a href={phone}>{restaurant.get('phone')}</a></div>
            </div>
            <div className="detailview-header-address mdl-card__supporting-text">
              <i className="material-icons">location_on</i>
              <span>{restaurant.get('address')}</span>
              <span>{restaurant.get('city')}, {restaurant.get('state')}, {restaurant.get('zip')}</span>
            </div>
          </div>
        </div>

        <div className="col-md-4 detailview-aside mdl-shadow--2d">
          <div className="detailview-description">
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">About</h2>
            </div>
            <div className="mdl-card__supporting-text">
              <p>{restaurant.get('description')}</p>
            </div>
          </div>
          <div className="detailview-aside-review mdl-card__actions mdl-card--border">
            <img className="img-circle" src={restaurant.get('snippet_image_url')}/>
            <div className="mdl-card__supporting-text">{restaurant.get('snippet_text')}</div>
          </div>
          <div className="detailview-location-pane">
            <a href={directions}><img src={googleMap}/></a>
            <p>Click on map for directions</p>
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
  // console.log('this state business', this.state.restaurant);
  // console.log('willmount', restaurant);
    var restaurantId = this.props.businessId;
  // console.log('restaurant id', restaurantId)
    if(!restaurantId){
      return;
    }
    restaurant.set('objectId', restaurantId);
    restaurant.fetch().then(()=>{
      this.setState({restaurant: restaurant});
    });
  },

  setFavorite: function(favorite){
    // var self = this;
    var restaurant = this.state.restaurant;
    // console.log(business.get('lat'));
    var currentUser = User.current().get('objectId');
    restaurant.set('favorite', {"__op": "AddRelation", "objects": [ {__type: "Pointer", className: "_User", objectId: currentUser} ] } );
    restaurant.save();
    this.setState({restaurant: restaurant})
    console.log(this.state);
  },

  removeFavorite: function(restaurant){
    var self = this;
    var restaurant = this.state.restaurant;
    var currentUser = User.current().get('objectId');
    restaurant.set('favorite', {"__op": "RemoveRelation", "objects": [ {__type: "Pointer", className: "_User", objectId: currentUser} ] } );
    restaurant.save().then(function(){
      self.props.router.navigate('restaurants/', {trigger: true})
    });
  // console.log(this.state);
  },

  render: function(){
    var test = this.state.restaurant.get('name');
    var specials = this.state.restaurant.get('specials');
    var appetizers = this.state.restaurant.get('appetizer');
    var maincourses = this.state.restaurant.get('maincourse');
    var desserts = this.state.restaurant.get('dessert');

    return (
      <Template>
        <div className="detail-view-container">
          <div className="detail-view-row row">
            <DetailView restaurant={this.state.restaurant} setFavorite={this.setFavorite} removeFavorite={this.removeFavorite} specials={specials}/>
            <SpecialsList specials={specials}/>
            <MenuList appetizers={appetizers} maincourses={maincourses} desserts={desserts}/>
          </div>
        </div>
      </Template>
    )
  },
});

module.exports = {
  SingleViewContainer: SingleViewContainer
};
