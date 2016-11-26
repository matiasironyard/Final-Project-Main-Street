var React = require('react');
var Backbone = require('backbone');
var models = require('../models/business.js');
var ParseCollection = require('../models/business.js').ParseCollection;
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
var FavoriteCollection = require('../models/business.js').FavoriteCollection;


console.log('hello favorites');



var FavoritesContainer = React.createClass({
  getInitialState: function(){
    return {
      favoriteCollection: new models.FavoriteCollection(),
    };
  },

componentWillMount: function(){
  var self = this;
  var businessCollection = new BusinessCollection();
  businessCollection.parseWhere('favorite', '_User', User.current().get('objectId')).fetch().then(function(response){
    return businessCollection;
  });
  this.setState({
    businessCollection: businessCollection,
  });
},

  render: function(){
    console.log('favorites', this.state.businessCollection);
    return (
      <h1>Favorites</h1>
    )
  }

});



module.exports = {
  FavoritesContainer: FavoritesContainer
}
