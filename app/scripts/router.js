var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

console.log('hi');

/* COMPONENT IMPORTS BELOW */
var setupParse= require('./parseUtilities').setupParse;
var AuthenticationContainer = require('./components/authentication.jsx').AuthenticationContainer;
var RegistrationContainer = require('./components/registration.jsx').RegistrationContainer;
var DashboardContainer = require('./components/dashboard.jsx').DashboardContainer;
var ViewAllContainer = require('./components/viewall.jsx').ViewAllContainer;
var SingleViewContainer = require('./components/singleview.jsx').SingleViewContainer;
var FavoritesContainer = require('./components/favorites.jsx').FavoritesContainer;
/* COMPONENT IMPORTS ABOVE */


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'restaurants/': 'allrestaurants',
    'restaurants/:id/': 'restaurant',
    'favorites/': 'favorites',
    'dashboard/': 'dashboard',
    'registration/': 'registration',
    'login/': 'login',
  },

  initialize: function(){
    setupParse('matiasrecipeserver', 'recipe');
  },

  index: function(){
    ReactDOM.render(
      React.createElement(AuthenticationContainer,  {router: this}),
      document.getElementById('app')
    );
  },

  registration: function(){
    ReactDOM.render(
      React.createElement(RegistrationContainer, {router: this}),
      document.getElementById('app')
    );
  },

  dashboard: function(){
    ReactDOM.render(
      React.createElement(DashboardContainer, {router: this}),
      document.getElementById('app')
    );
  },


  allrestaurants: function(){
    ReactDOM.render(
      React.createElement(ViewAllContainer, {router: this}),
      document.getElementById('app')
    );
  },

  restaurant: function(businessId){
    console.log('restaurant view');
    ReactDOM.render(
      React.createElement(SingleViewContainer, {businessId: businessId, router: this}),
      document.getElementById('app')
    );
  },

  favorites: function(){
    console.log('favorites view');
    ReactDOM.render(
      React.createElement(FavoritesContainer, {router: this}),
      document.getElementById('app')
    );
  },

});

var router = new AppRouter();
module.exports = router;
