var React = require('react');
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
    console.log('test', favorites);
    return (
      <div className ="col-md-2 restaurant-card">
        <a href={'#restaurants/' + favorites.get('objectId') + '/'} className="individual-item">
          <div className="restaurant-card-header">
            <img src={favorites.get('image_url')}/>
            <h6>{favorites.get('name')}</h6>
            <h6>{favorites.get('mainCategory')}</h6>
          </div>
        </a>
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
    console.log(this.state);
  },

  render: function(){
    var self = this;
    console.log('Favorties render', self.props.restaurants);
    var favoritesList = self.props.restaurants.map(function(favorites){
      console.log('2-map', favoritesList);
      return (
          <div key={favorites.cid}>
            <FavoriteListing favorites={favorites}/>
          </div>
      );
    });
    return (
      <div>
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
  businessCollection.parseWhere('favorite', '_User', User.current().get('objectId')).fetch().then(function(response){
    console.warn(response);
    if(businessCollection.length >= 1){
      console.log('length', businessCollection.length);


    } else {
      console.log('we got none');
    };
    self.setState({
      businessCollection: businessCollection
    });
  });
},

  render: function(){
    console.log('favorites', this.state.businessCollection);
    return (
      <div className="row">
        <div className="col-md-12">

          <Favorites restaurants={this.state.businessCollection}/>
        </div>
      </div>
    )
  }
});



module.exports = {
  FavoritesContainer: FavoritesContainer
}
