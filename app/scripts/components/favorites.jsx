var React = require('react');
var Backbone = require('backbone');
var models = require('../models/business.js');
var ParseCollection = require('../models/business.js').ParseCollection;
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
// var FavoriteCollection = require('../models/business.js').FavoriteCollection


var FavoriteListing = React.createClass({
  render: function(){
    var favorites = this.props.favorites;
    console.log('test', favorites);
    return (
      <div className ="col-sm-12-fluid restaurant-card">
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
      <div className="col-md-12">
        <h3>Favorites</h3>
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
  businessCollection.parseWhere('favorite', '_User', User.current().get('objectId')).fetch().then(function(){
    self.setState({
      businessCollection: businessCollection
    });
  });
},

  render: function(){
    console.log('favorites', this.state.businessCollection);
    return (
      <div className="col-md-3">
        <Favorites restaurants={this.state.businessCollection}/>
      </div>
    )
  }
});



module.exports = {
  FavoritesContainer: FavoritesContainer
}
