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
// THANKS GRAYSON! :
// https://github.com/graysonhicks/parkary/blob/master/app/scripts/components/mapview/dynamicmap.jsx


console.log(Modal);

// var FavoriteCollection = require('../models/business.js').FavoriteCollection

var FavoritesMap = React.createClass({
  getInitialState: function(){

    var state = {
      zoom: 12,
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

        <Marker onClick={self.onMarkerClick}  key={favorites.cid} name={name} position={{lat: lat, lng: long}}>
          <InfoWindow
            marker={self.state.activeMarker}
            visible={self.state.showingInfoWindow}>
            <div>
              <p>{name}</p>
              <a href={directions}>Directions</a>
            </div>
          </InfoWindow>
        </Marker>
      )
    });
    console.log(labelInfo);



    return (
      <section id="map-section" style={{height:"525px"}}>

        <GoogleMapLoader containerElement={
            <div
              {...this.props}
              style={{
                height: "100%"
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
            <Marker onClick={this.onMarkerClick} name={'McAbee'} position={{lat:34.84802340, lng:-82.39543630}} />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
              <div>
                <h5>Publix McAbee Station</h5>
                <h6>400 E McBee Ave Ste 100, Greenville, SC 29601</h6>
              </div>
            </InfoWindow>
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
  handleClick: function(e){
    e.preventDefault();
    Backbone.history.navigate('#items/', {trigger:true});
  },


  render: function(){

    return (
      <div>
        <h1 className="locationTitle">Locations</h1>
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
      <div className="favorites-pane col-md-12">
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
      <div className="favorites-row">
        <div className="favorites-col col-md-11">
          <Favorites restaurants={this.state.businessCollection}/>
        </div>
        <MapContainer restaurants={this.state.businessCollection}/>
      </div>
    )
  }
});


module.exports = {
  FavoritesContainer: FavoritesContainer
}
