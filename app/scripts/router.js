var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');


/* COMPONENT IMPORTS BELOW */

/* COMPONENT IMPORTS ABOVE */


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    '/restaurants/': 'all-restaurants',
    '/restaurants/:id/': 'restaurant',
    '/bars/': 'all-bars',
    '/bars/:id': 'bar',
    '/entertainment/': 'all-entertainment-venues',
    '/entertainment/:id': 'entertainment',
    '/dashboard/': 'dashboard',
    '/login/': 'login',
  },

  // initialize: function(){
  //   setupParse()
  // },

  login: function(){
    ReactDOM.render(
      React.createElement(AuthenticationContainer),
      document.getElementById('app')
    );
  },

});
