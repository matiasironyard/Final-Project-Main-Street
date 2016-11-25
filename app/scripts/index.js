console.log("Hello World!");
var $ = require('jquery');
var Backbone = require('backbone');
require('./router.js');


$(function(){
 Backbone.history.start();

});





// $.get('https://matias-recipe.herokuapp.com/login?username=' + username + '&password=' + password).then(function(response){
//   console.warn(response.phone);
//   var JSONdata= JSON.stringify(response);
//   localStorage.setItem('username', response.username);
//   localStorage.setItem('token', response.sessionToken);
//   localStorage.setItem('objectID', response.objectId);
//   localStorage.setItem('phone',response.phone);
//   localStorage.setItem('user', JSONdata);
//   if(response.sessionToken){
//     self.props.router.navigate('registration/', {trigger: true});
//   };
// });
