var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/business.js');
var ParseCollection = require('../models/business.js').ParseCollection;
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
var Modal = require('react-modal');

console.log(Modal);

// var FavoriteCollection = require('../models/business.js').FavoriteCollection



var FavoriteListing = React.createClass({
  getInitialState: function(){
    return {
        favorites: this.props.favorites,
        // modalIsOpen: false,
    };
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.favorites);
  },


  render: function(){
    var favorites = this.props.favorites;
  // console.log('test', favorites);
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

    //   if(restaurants.length=0){
    // // console.log('none akdfjlkadsjlafkjsd;klfjs;');
    //
    // };

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
      </div>
    )
  }
});



module.exports = {
  FavoritesContainer: FavoritesContainer
}
