var Backbone = require('backbone');
var $ = require('jquery');

function setupParse(appId, apiKey, sessionId){
  $.ajaxSetup({
    beforeSend: function(xhr){
      xhr.setRequestHeader("X-Parse-Application-Id", appId);
      xhr.setRequestHeader("X-Parse-REST-API-Key", apiKey);
      if(sessionId) {
        xhr.setRequestHeader("X-Parse-Session-Token", sessionId);
        //pass sessionId from localStorage?
      }
    }
  });
}
var User = Backbone.Model.extend({
  auth: function(){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", appId);
        xhr.setRequestHeader("X-Parse-REST-API-Key", apiKey);
        if(sessionId) {
          xhr.setRequestHeader("X-Parse-Session-Token", sessionId);
          //pass sessionId from localStorage?
        }
      }
    });
  },
}, {
  login: function(username, password, callback){
    $.post('/login/', {username: username, password: password}), then(function(response){
      var user = new User (response);
      user.auth();
      localStorage.setItem('user', JSON.stringify(user.toJSON()));
      callbackObj.success(user, response);
    });
  },
  current: function(){
    var userData = localStorage.getItem('user');
    console.log('userData', userData)
    if (!userData || !JSON.parse(userData).sessionToken){
      return undefined;
    }
    return new User(JSON.parse(userData));
  }
});
var user = User.current();
console.log('user', user.toJSON());

module.exports = {
  setupParse: setupParse,
  User: User
};
