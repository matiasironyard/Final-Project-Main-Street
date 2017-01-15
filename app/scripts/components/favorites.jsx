var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/business.js');
var ParseCollection = require('../models/business.js').ParseCollection;
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
var Modal = require('react-modal');
require('backbone-react-component');
var $ = require('jquery');
var google = require('react-google-maps');
var ScriptjsLoader = require("react-google-maps/lib/async/ScriptjsLoader");
var GoogleMapLoader = google.GoogleMapLoader;
var GoogleMap = google.GoogleMap;
var Marker = google.Marker;
var InfoWindow = google.InfoWindow;
var Template = require('../templates/templates.jsx');
var Modal = require('react-modal');


// THANKS GRAYSON! :
// https://github.com/graysonhicks/parkary/blob/master/app/scripts/components/mapview/dynamicmap.jsx


var FavoritesMap = React.createClass({
  getInitialState: function(){

    var state = {
      zoom: 14,
      showingInfoWindow: true,
      center: {
        lat:  (34.852619),
        lng:  (-82.394012)
      },
    }
    return  state
  },

  onMarkerClick: function(props, marker, e){
    console.log("marker clicked")
    this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
  });
},

  render: function(){
    var self = this;
    var center = self.state.center;
    var zoom = self.state.zoom;
    var restaurants= self.props.restaurants;
    var labelInfo= restaurants.map(function(favorites){
      var name = favorites.get('name');
      var lat = favorites.get('lat');
      var long = favorites.get('long');
      var directions = 'https://www.google.com/maps/dir//'+lat+ ',' + long;

      return (
          <Marker onClick={self.onMarkerClick} visible={self.state.showingInfoWindow} key={favorites.cid} name={name} position={{lat: lat, lng: long}} >
            <InfoWindow
              marker={self.state.activeMarker}>
              <div>
                <span>{name}</span>
              </div>
            </InfoWindow>
          </Marker>

      )
    });
    return (
      <section className="col-md-12" id="map-section" style={{height:"525px"}}>
        <GoogleMapLoader containerElement={
            <div
              {...this.props.containerElementProps}
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
              center={center}
              defaultCenter={center}
            >
          {labelInfo}
      </GoogleMap>
          }
        />
      </section>
    );
  }
});



var MapContainer = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  render: function(){

    return (
      <div className="favorites-map col-md-12 col-sm-12 col-xs-12">
          <FavoritesMap restaurants={this.props.restaurants} />
    </div>
    )
  }
});




var FavoriteListing = React.createClass({
  getInitialState: function(){
    return {
        favorites: this.props.favorites,
        // modalIsOpen: false,
    };
  },

  componentWillReceiveProps: function(newProps){
    this.forceUpdate();
    // this.setState(newProps.favorites);
  },

  navigate: function(e){
    e.preventDefault();
    var self = this;
    var restaurants = this.props.favorites;
    var name = restaurants.get('name');
    var id = restaurants.get('objectId');
    localStorage.setItem('name', name);
    self.props.router.navigate('/restaurants/' + id + '/', {
      trigger: true
    })
  },

  render: function(){
    var favorites = this.props.favorites;
  // console.log('test', favorites.get('name'));
  var lat = favorites.get('lat');
  var long = favorites.get('long');
  var directions = 'https://www.google.com/maps/dir//'+lat+ ',' + long;

    return (
      <div className ="restaurant-cards mdl-shadow--2dp col-md-2 col-sm-4 col-xs-5">
        <div className="material-icons mdl-badge mdl-badge--overlap pull-right" data-badge="♥"/>
        <div className="restaurant-card-header">
          <a onClick={this.navigate}  className="individual-item"><img className="restaurant-card-img" height="100" width="100" src={favorites.get('image_url')}/></a>
          <p className="restaurant-card-name">{favorites.get('name')}</p>
          <span className="restaurant-card-category">{favorites.get('mainCategory')}</span>
          <div className="mdl-card__actions mdl-card--border">
            <a href={directions}>Directions</a>
          </div>
        </div>
      </div>
    )
  }
});

var Favorites = React.createClass({
  // componentWillMount: function(){
  //   var favorites = this.props.restaurants;
  // },

  render: function(){
    var self = this;
  // console.log('Favorties render', self.props.restaurants.length);
    var restaurants = self.props.restaurants;

    var favoritesList = restaurants.map(function(favorites){
    // console.log('2-map', favoritesList);
      return (
          <div key={favorites.cid}>
            <FavoriteListing favorites={favorites}  router={self.props.router}/>
          </div>
      );
    });
    return (
      <div className="row">
        <div className="col-md-11 col-sm-11 col-sm-offset-1 col-xs-10 col-xs-offset-1">
            {favoritesList}

        </div>
      </div>
    )
  }
});

var FavoritesContainer = React.createClass({
  getInitialState: function(){
    return {
      businessCollection: new models.BusinessCollection(),
    };
  },

componentWillMount: function(){
  var self = this;
  var businessCollection = new BusinessCollection();
  businessCollection.comparator = 'name';
  businessCollection.parseWhere('favorite', '_User', User.current().get('objectId')).fetch().then(function(response){
    console.warn(response);
    if(businessCollection.length >= 1){
    // console.log('length', businessCollection.length);

    } else {
    // console.log('we got none');
    };
    self.setState({
      businessCollection: businessCollection
    });
  });
},


  render: function(){
  // console.log('favorites', this.state.businessCollection);
    return (
      <Template>
        <div className="favorites-row">
          <div className="favorites-col col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1">
            <Favorites restaurants={this.state.businessCollection} router={this.props.router}/>
            <MapContainer restaurants={this.state.businessCollection}/>
          </div>
        </div>
      </Template>
    )
  }
});


module.exports = {
  FavoritesContainer: FavoritesContainer
}
