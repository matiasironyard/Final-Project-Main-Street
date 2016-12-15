var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
var models = require('../models/business');
var Template = require('../templates/templates.jsx');
var User = require('../parseUtilities').User;
var Favorites = require('./favorites.jsx').FavoritesContainer;
require('backbone-react-component');
var $ = require('jquery');
var google = require('react-google-maps');
var ScriptjsLoader = require("react-google-maps/lib/async/ScriptjsLoader");
var GoogleMapLoader = google.GoogleMapLoader;
var GoogleMap = google.GoogleMap;
var Marker = google.Marker;
var InfoWindow = google.InfoWindow;
var phoneFormatter = require('phone-formatter');


var router = require('../router').router;
// var GoogleMaps = require('../models/business.js').GoogleMaps;
// var googleMaps = new GoogleMaps();

var SpecialsList = React.createClass({
  render: function() {
    var specials = this.props.specials.length;
    var specialsDisplay= "row show";
    if(specials == 0) {
      specialsDisplay = "row hidden";
    }

    var specialsListItems = this.props.specials.map(function(special) {
      return (

        <tr key={special.cid} className="detailview-menu-rows">
          <td className="special-name ">{special.get('name')}</td>
          <td className="special-description">{special.get('description')}</td>
          <td className="special-price ">{special.get('price')}</td>
          {/*<td className="special-available ">{special.get('expirydate')}</td>*/}
        </tr>
      )
    });
    // console.log('specialslistitems', specialsListItems);
    return (
      <div className="col-md-10 col-md-offset-1 detailview-menu-list">
        <div className={specialsDisplay}>
          <h3 className="detailview-menu-headers">Specials</h3>
          <table className="menu col-md-12 col-sm-12 col-xs-12">
            <thead>
              <tr>
                {/*<th className="table-dish">Dish</th>
                <th className="table-description">Description</th>
                <th className="table-price">Price</th>
                {/*<th className="table-available">Ends</th>*/}
              </tr>
            </thead>
            <tbody>
                {specialsListItems}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
});

var MenuList = React.createClass({

  render: function() {
    var appetizers = this.props.appetizers.length;
    var appetizersDisplay= "row show";
    if(appetizers == 0) {
      appetizersDisplay = "row hidden";
    }

    var breakfast = this.props.breakfast.length;
    var breakfastDisplay= "row show";
    if(breakfast == 0){
      breakfastDisplay = "row hidden"
    }

    var lunch = this.props.lunch.length;
    var lunchDisplay = "row show";
    if(lunch == 0){
      lunchDisplay = "row hidden"
    }

    var dinner = this.props.dinner.length;
    var dinnerDisplay = "row show";
    if(dinner == 0){
      dinnerDisplay = "row hidden"
    }

    var desserts = this.props.desserts.length;
    var dessertsDisplay = "row show";
    if(desserts == 0){
      dessertsDisplay = "row hidden"
    }

   console.log('display', breakfastDisplay);

    var appetizersListItems = this.props.appetizers.map(function(appetizer) {

      return (
        <tr key={appetizer.cid} className="detailview-menu-rows">
          <td className="appetizer-name ">{appetizer.get('name')}</td>
          <td className="appetizer-description">{appetizer.get('description')}</td>
          <td className="appetizer-price ">{appetizer.get('price')}</td>
        </tr>
      )
    });

    var BreakfastListItems = this.props.breakfast.map(function(breakfast) {
      return (
        <tr key={breakfast.cid} className="detailview-menu-rows">
          <td className="breakfast-name">{breakfast.get('name')}</td>
          <td className="breakfast-description">{breakfast.get('description')}</td>
          <td className="breakfast-price">{breakfast.get('price')}</td>
        </tr>
      )
    });

    var lunchListItems = this.props.lunch.map(function(lunch) {
      return (
        <tr key={lunch.cid} className="detailview-menu-rows">
          <td className="lunch-name">{lunch.get('name')}</td>
          <td className="lunch-description">{lunch.get('description')}</td>
          <td className="lunch-price">{lunch.get('price')}</td>
        </tr>
      )
    });

    var dinnerListItems = this.props.dinner.map(function(dinner) {
      return (
        <tr key={dinner.cid} className="detailview-menu-rows">
          <td className="dinner-name">{dinner.get('name')}</td>
          <td className="dinner-description">{dinner.get('description')}</td>
          <td className="dinner-price">{dinner.get('price')}</td>
        </tr>
      )
    });

    var dessertsListItems = this.props.desserts.map(function(dessert) {
      return (
        <tr key={dessert.cid} className="detailview-menu-rows">
          <td className="">{dessert.get('name')}</td>
          <td className="dessert-description">{dessert.get('description')}</td>
          <td className="dessert-price">{dessert.get('price')}</td>
        </tr>
      )
    });

    return (
      <div className="col-md-10 col-md-offset-1 detailview-menu-list">
        <div className={appetizersDisplay}>
          <h3 className="detailview-menu-headers">Appetizers</h3>
          <table className="menu col-md-12 col-sm-12 col-xs-12">
            <thead>
              <tr>
                <th className="table-dish"></th>
                <th className="table-description"></th>
                <th className="table-price"></th>
              </tr>
            </thead>
            <tbody>
              {appetizersListItems}
            </tbody>
          </table>
        </div>

      <div className={breakfastDisplay}>
        <h3 className="detailview-menu-headers">Breakfast</h3>
          <table className="menu col-md-12 col-sm-12 col-xs-12">
            <thead>
              <tr>
                <th className="table-dish"></th>
                <th className="table-description"></th>
                <th className="table-price"></th>
              </tr>
            </thead>
            <tbody>
              {BreakfastListItems}
            </tbody>
          </table>
        </div>

      <div className={lunchDisplay}>
        <h3 className="detailview-menu-headers">Lunch</h3>
          <table className="menu col-md-12 col-sm-12 col-xs-12">
            <thead>
              <tr>
                <th className="table-dish"></th>
                <th className="table-description"></th>
                <th className="table-price"></th>
              </tr>
            </thead>
            <tbody>
              {lunchListItems}
            </tbody>
          </table>
        </div>

        <div className={dinnerDisplay}>
          <h3 className="detailview-menu-headers">Dinner</h3>
            <table className="menu col-md-12 col-sm-12 col-xs-12">
              <thead>
                <tr>
                  <th className="table-dish"></th>
                  <th className="table-description"></th>
                  <th className="table-price"></th>
                </tr>
              </thead>
              <tbody>
                {dinnerListItems}
              </tbody>
            </table>
          </div>

      <div className={dessertsDisplay}>
        <h3 className="detailview-menu-headers">Desserts</h3>
          <table className="menu col-md-12 col-sm-12 col-xs-12">
            <thead>
              <tr>
                <th className="table-dish"></th>
                <th className="table-description"></th>
                <th className="table-price"></th>
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

var RestaurantMap = React.createClass({
  getInitialState: function() {
    var state = {
      zoom: 17,
      showingInfoWindow: true,
    }
    return state
  },

  onMarkerClick: function(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  },
  render: function() {
    var self = this;
    var center = self.state.center;
    var zoom = self.state.zoom;
    var restaurant = self.props.restaurant;
    var lat = restaurant.get('lat');
    var long = restaurant.get('long');
    var location = 'lat:' + lat + ',' + 'lng:' + long;
    var name = restaurant.get('name');
    var directions = 'https://www.google.com/maps/dir//' + lat + ',' + long;
    return (
      <section className="col-md-12 fluid" id="map-section" style={{height:"325px"}}>
        <GoogleMapLoader containerElement={
            <div
              {...this.props}
              style={{
                height: "100%",
                width: "100%"
              }}
            />
          }
           googleMapElement={
            <GoogleMap
              id="map"
              zoom={zoom}
              ref="map"
              center={{lat: lat, lng: long}}
              defaultCenter={{lat: lat, lng: long}}
            >
            <Marker onClick={self.onMarkerClick} visible={self.state.showingInfoWindow} name={name} position={{lat: lat, lng: long}}>
              <InfoWindow
                marker={self.state.activeMarker}
                visible={self.state.showingInfoWindow}>
                <div>
                  <a href={directions}>Directions to {name}</a>
                </div>
              </InfoWindow>
            </Marker>
      </GoogleMap>
          }
        />
      </section>
    );
  }
});

var DetailView = React.createClass({
  getInitialState: function() {
    return {
      restaurant: {},
    }
  },

  componentWillMount: function(){
      var restaurant = this.props.restaurant;
      this.setState({restaurant: restaurant})
      console.log('pre yipi',this.state);
  },

  componentWillReceiveProps(nextProps) {
  this.setState({
    restaurant: nextProps.restaurant
  });
},

  handleFavorite: function(e) {
    e.preventDefault();
    var self = this;
    var favorite = self.props.restaurant.get('objectId');
    self.props.setFavorite(favorite);
    // self.setState({
    //   favorite: favorite,
    // })
  },

  handleRemoveFavorite: function(e) {
    e.preventDefault();
    var self = this;
    var favorite = self.props.restaurant.get('objectId');
    self.props.removeFavorite(favorite);
    // self.setState({
    //   favorite: favorite
    // });
  },

  render: function() {
    var self = this;
    var restaurant = self.state.restaurant;
    var specials = restaurant.get('specials');
    console.log('specials', specials);
    var appetizers = restaurant.get('appetizer');
    var breakfast = restaurant.get('breakfast');
    var lunch = restaurant.get('lunch');
    var dinner = restaurant.get('dinner');
    var desserts = restaurant.get('dessert');
    var geolocation = restaurant.get('lat') + ',' + restaurant.get('long');
    var imgUrl = restaurant.get('image_upload');
    var divStyle = {
      height: '50vh',
      backgroundImage: 'url(' + imgUrl + ')'
    };
    var phone = restaurant.get('phone');
    console.log('phone', phone);
    return (
      <div className="detailview-pane col-md-10 col-md-offset-1">
        <div className="detailview-header col-md-12 col-sm-6">
          <div className="row">
            <div className="detailview-header-img" style={divStyle}>
              <button className="favorite-btn mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored pull-right" onClick={this.handleRemoveFavorite} type="submit" value="Remove Favorite"><i className="material-icons">clear</i></button>
              <button className="favorite-btn mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored pull-right" onClick={this.handleFavorite} type="button"><i className="material-icons">favorite_border</i></button>
            </div>
            <div className="detailview-header-text col-md-12">
              <h1 className="detailview-header-name">
                {restaurant.get('name')}
              </h1>
              <img src={restaurant.get('rating_img_url')} className="detailview-header-review-img"></img>
              <h4 className="detailview-header-cat">
                {restaurant.get('mainCategory')}
              </h4>
            </div>
            <div className="detailview-header-info col-md-12">
              <div className="detailview-phone">
                <i className="material-icons">phone</i>
                <a href={phone}>{phone}</a>
              </div>
              <div className="detailview-address ">
                <i className="material-icons">location_on</i>
                <span>{restaurant.get('address')}</span>
                <span>{restaurant.get('city')}, {restaurant.get('state')}, {restaurant.get('zip')}</span>
              </div>
            </div>
            <RestaurantMap restaurant={this.props.restaurant} />
          </div>
        </div>

        <div className="col-md-5 col-sm-6 col-xs-12 detailview-aside mdl-shadow--4d">
          <div className="detailview-about">
            <div className="detailview-description">
              <div className="mdl-card__title">
                <h3 className="detailview-headers">About</h3>
              </div>
              <div className="mdl-card__supporting-text">
                <p><img className="about-image" src= {restaurant.get('menu_upload')} width="150"/>{restaurant.get('description')}</p>
              </div>
            </div>
            <div className="detailview-aside-review mdl-card__actions mdl-card--border">
              <div className="mdl-card__title">
                <h3 className="detailview-headers">Reviews</h3>
              </div>
              <Reviews restaurant={this.props.restaurant} />
            </div>
          </div>
          <div className="detailview-location-pane">
          </div>
        </div>
        <div className="menu-pane col-md-7 col-sm-12 col-xs-12">
          <div className="detailview-menu-header col-md-10 col-md-offset-1 col-sm-12 col-xs-12 mdl-shadow--2d">
            <h1>Menu</h1>
          </div>
          <SpecialsList specials={specials}/>
          <MenuList restaurant={this.props.restaurant} appetizers={appetizers} breakfast={breakfast} lunch={lunch} dinner={dinner} desserts={desserts}/>
        </div>
      </div>
    )
  }
});

var Reviews = React.createClass({
  getInitialState: function() {
    return {
      reviews: undefined,
    }
  },

  componentWillMount: function(){
      var reviews = this.props.restaurant.get('reviews');
      this.setState({reviews: reviews})
      console.log('pre yipi 2',this.state.reviews);
  },

  componentWillReceiveProps(nextProps) {
  this.setState({
    reviews: nextProps.restaurant.get('reviews')
  });
},

render: function(){
  var self = this;
  console.log('reviews render', this.state.reviews);
  if (self.state.reviews) {
    var reviews = self.state.reviews.map(function(reviews){
      var imgUrl = reviews.user.image_url;
      var divStyle = {
        borderRadius: '100%',
        backgroundImage: 'url(' + imgUrl + ')'
      };
    return (
      <li key={reviews.time_created} className="detailview-reviews-li row mdl-list__item">
        <a href={reviews.url}><div className="detailview-reviews-img col-md-2 col-sm-3 col-xs-3" style={divStyle}/></a>
        <div className="detailview-reviews-text col-md-10 col-sm-8 col-xs-8">
          <span>{reviews.user.name}</span>
          <span className="mdl-list__item-text-body">
            {reviews.text}
          </span>
          <span className="mdl-list__item-text-body">
            Rating: {reviews.rating}/5
          </span>
        </div>
      </li>
    )
  });
}
  return (
    <ul className="detailview-reviews-ul mdl-list">
      {reviews}
    </ul>
  )
}
});

var SingleViewContainer = React.createClass({
  getInitialState: function() {
    return {
      restaurant: new models.Business()
    }
  },
  componentDidMount: function() {
    var restaurant = this.state.restaurant;
    var restaurantId = this.props.businessId;
    if (!restaurantId) {
      return;
    }
    restaurant.set('objectId', restaurantId);
    restaurant.fetch().then(() => {
      var self=this;
       var id = restaurant.get('id');
      fetch("https://yelp-proxy-server.herokuapp.com/businesses?business=" +  id + "/reviews").then(function(response) {
          return response.json();
        }).then(function(data) {
          var reviewData=data.reviews;
          restaurant.set({
            reviews: reviewData
          })
          self.setState({restaurant: restaurant})
        }).catch(function() {
        });
      this.setState({
        restaurant: restaurant,
      });
    });
  },


  setFavorite: function(favorite) {
    // var self = this;
    var restaurant = this.state.restaurant;
    var currentUser = User.current().get('objectId');
    restaurant.set('favorite', {
      "__op": "AddRelation",
      "objects": [{
        __type: "Pointer",
        className: "_User",
        objectId: currentUser
      }]
    });
    restaurant.save();
    this.setState({
      restaurant: restaurant
    })
  },

  removeFavorite: function(restaurant) {
    var self = this;
    var restaurant = this.state.restaurant;
    var currentUser = User.current().get('objectId');
    restaurant.set('favorite', {
      "__op": "RemoveRelation",
      "objects": [{
        __type: "Pointer",
        className: "_User",
        objectId: currentUser
      }]
    });
    restaurant.save().then(function() {
      self.props.router.navigate('restaurants/', {
        trigger: true
      })
    });
  },
  render: function() {
    var test = this.state.restaurant.get('name');
    var specials = this.state.restaurant.get('specials');
    var appetizers = this.state.restaurant.get('appetizer');
    var breakfast= this.state.restaurant.get('breakfast');
    var lunch = this.state.restaurant.get('lunch');
    var dinner = this.state.restaurant.get('dinner');
    var desserts = this.state.restaurant.get('dessert');
    var reviews = this.state.restaurant.get('reviews');
    console.log('parent reviews', reviews);

    return (
      <Template>
        <div className="detail-view-container">
          <div className="detail-view-row">
            <DetailView restaurant={this.state.restaurant} setFavorite={this.setFavorite} removeFavorite={this.removeFavorite} specials={specials}/>
          </div>
        </div>
      </Template>
    )
  },
});

module.exports = {
  SingleViewContainer: SingleViewContainer
};
