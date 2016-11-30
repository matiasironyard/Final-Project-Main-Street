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


console.log(Modal);

// var FavoriteCollection = require('../models/business.js').FavoriteCollection
var FavoritesMap = React.createClass({
  getInitialState: function(){

    var state = {
      modalIsOpen: false,
      zoom: 14,
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
    showingInfoWindow: true
  });
},

  render: function(){
    var self = this;
    var center = this.state.center;
    var zoom = this.state.zoom;
    var restaurants= this.props.restaurants;
    var labelInfo= restaurants.map(function(favorites){
      var lat = favorites.get('lat');
      var long = favorites.get('long');
      var name = favorites.get('name');
      var directions = 'https://www.google.com/maps/dir//'+lat+ ',' + long;
      return (
          <Marker onClick={self.onMarkerClick} key={favorites.cid} name={name} position={{lat: lat, lng: long}}>
            <InfoWindow
              marker={self.state.activeMarker}
              visible={self.state.showingInfoWindow}
              onClick={self.onMarkerClick} >
              <div>
                <p>{name}</p>
                <a href={directions}>Directions</a>
                <button className="btn"onClick={self.closeModal}>Close</button>
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


  render: function(){
    var favorites = this.props.favorites;
  // console.log('test', favorites.get('name'));
    return (
      <div className ="restaurant-cards mdl-card mdl-shadow--2dp col-md-2">
        <div className="material-icons mdl-badge mdl-badge--overlap" data-badge="♥"/>
        <div className="restaurant-card-header">
          <a href={'#restaurants/' + favorites.get('objectId') + '/'} className="individual-item"><img className="restaurant-card-img" src={favorites.get('image_url')}/></a>
          <p className="restaurant-card-name">{favorites.get('name')}</p>
          <div className="mdl-card__actions mdl-card--border">
            <p className="restaurant-card-category">{favorites.get('mainCategory')}</p>
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
  handleRemoveFavorite: function(favorite){
    var self = this;
    self.props.removeFavorite(favorite);
  // console.log(this.state);
  },

  render: function(){
    var self = this;
  // console.log('Favorties render', self.props.restaurants.length);
    var restaurants = self.props.restaurants;
    var favoritesList = restaurants.map(function(favorites){
    // console.log('2-map', favoritesList);
      return (
          <div key={favorites.cid}>
            <FavoriteListing favorites={favorites}/>
          </div>
      );
    });
    return (
      <div className="favorites-pane col-md-12 col-sm-12 col-xs-11">
        {favoritesList}
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
          <div className="favorites-col">
            <Favorites restaurants={this.state.businessCollection}/>
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
