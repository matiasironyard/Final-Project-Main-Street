console.log("Hello World!");
var $ = require('jquery');
var Backbone = require('backbone');


var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.yelp.com/v3/businesses/search/phone?phone=%2018645955240",
  "method": "GET",
  "headers": {
    "authorization": "Bearer i565rg5Yi8NoRyCmfTHX5ngjnlRSCmkQkG0CHSibDWzBY2OJQd3LNU0WfEsf9XibRZAiCBriAohxLkjbsZ4IfqMi-al9M4xp9DYM9vGZM6MlyNW45Z8earlIU94pWHYx",
    "cache-control": "no-cache",
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
