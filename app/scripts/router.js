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
/* COMPONENT IMPORTS ABOVE */


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'restaurants/': 'allrestaurants',
    'restaurants/:id/': 'restaurant',
    'bars/': 'all-bars',
    'bars/:id': 'bar',
    'entertainment/': 'all-entertainment-venues',
    'entertainment/:id': 'entertainment',
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
      React.createElement(RegistrationContainer,  {router: this}),
      document.getElementById('app')
    );
  },

  allrestaurants: function(){
    ReactDOM.render(
      React.createElement(ViewAllContainer, {router: this}),
      document.getElementById('app')
    );
  },

  dashboard: function(){
    ReactDOM.render(
      React.createElement(DashboardContainer, {router: this}),
      document.getElementById('app')
    );
  },


});

var router = new AppRouter();
module.exports = router;
