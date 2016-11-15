console.log("Hello World!");
var $ = require('jquery');
var Backbone = require('backbone');
require('./router.js');


$(function(){
 Backbone.history.start();

});


$.ajax('https://yelp-proxy-server.herokuapp.com/test').then(function(data){
  console.log('this proxy server is working', data);
});
