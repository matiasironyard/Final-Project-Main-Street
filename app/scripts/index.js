console.log("Hello World!");
var $ = require('jquery');
var Backbone = require('backbone');
require('./router.js');


$(function(){
 Backbone.history.start();

});


// $.ajax('https://yelp-proxy-server.herokuapp.com/api?phone=+1-864-351-0521').then(function(data){
//   console.log('this proxy server is working', data);
//   var business = data.businesses.map(function(data){
//     console.log(data.name);
//     console.log(data.url);
//   });
// });
