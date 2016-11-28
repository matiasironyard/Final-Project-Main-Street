var Backbone = require('backbone');
var Business = require('../components/authentication.jsx').AuthenticationContainer;
var User = require('../parseUtilities.js').User;

//setup Parse models
/**
*Parse Model and Collection
*/

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  save: function(key, val, options){    //delete the following so that we don't get a mismatch error when posting.
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;
    //return the model back to its original state since we have overloaded per above.
    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  saveMainCourse: function(key, val, options){    //delete the following so that we don't get a mismatch error when posting.
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;
    //return the model back to its original state since we have overloaded per above.
    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  saveDessert: function(key, val, options){    //delete the following so that we don't get a mismatch error when posting.
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;
    //return the model back to its original state since we have overloaded per above.
    return Backbone.Model.prototype.save.apply(this, arguments);
  },

});

var ParseCollection = Backbone.Collection.extend({
  whereClause: {field: '', className: '', objectId: ''},
  //set up a 'parseWhere' method in order to successfully post to Parse server. See docs @ https://parseplatform.github.io/docs/rest/guide/#relational-queries
  parseWhere: function(field, className, objectId){
    this.whereClause = {
      field: field,
      className: className,
      objectId: objectId,
      '__type': 'Pointer'
    };
    return this;
  },
  url: function(){
    var url = this.baseUrl;
    // console.log('url/parse-where', url);

    if(this.whereClause.field){
          var field = this.whereClause.field;
          delete this.whereClause.field;
          url += '?where={"' + field + '":' + JSON.stringify(this.whereClause) + '}';
        }
    return url;
  },
  parse: function(data){
    // console.log('parse data/parse-where', data.results[0].phone);
    return data.results;
  },
});

/**
*Specials Model and Collections
*/
var Appetizer = ParseModel.extend ({
idAttribute: 'cid',
  defaults: {
    name: '',
    description: '',
    price: '',
  },
});

var AppetizerCollection = ParseCollection.extend ({
  model: Appetizer,
  baseUrl: 'https://matias-recipe.herokuapp.com/classes/Appetizer'
});

var MainCourse = ParseModel.extend ({
idAttribute: 'cid',
  defaults: {
    name: '',
    description: '',
    price: '',
  },
});

var MainCourseCollection = ParseCollection.extend ({
  model: MainCourse,
  baseUrl: 'https://matias-recipe.herokuapp.com/classes/MainCourse'
});

var Dessert= ParseModel.extend ({
idAttribute: 'cid',
  defaults: {
    name: '',
    description: '',
    price: '',
  },
});

var DessertCollection = ParseCollection.extend ({
  model: Dessert,
  baseUrl: 'https://matias-recipe.herokuapp.com/classes/Appetizer'
});

var Special = ParseModel.extend ({
  idAttribute: 'cid',
  defaults: {
    date: '',
    effectivedate: '',
    expirydate: '',
    name: '',
    description: '',
    price: '',
    picture: '',
  },
});

var SpecialCollection = ParseCollection.extend ({
  model: Special,
  baseUrl: 'https://matias-recipe.herokuapp.com/classes/Special'
});


/**
*Business Model and Collections
*/

var Business = ParseModel.extend ({
  defaults: {
    id: '',
    name: '',
    subCategory: 'no subcategory',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    image_url: '',
    rating_img_url: '',
    is_closed: '',
    specials: new SpecialCollection(),
    appetizer: new AppetizerCollection(),
    maincourse: new MainCourseCollection(),
    dessert: new DessertCollection(),
  },
  urlRoot: 'https://matias-recipe.herokuapp.com/classes/Business',

  saveSpecial: function(key, val, options){
    this.set('specials', this.get('specials').toJSON());
    return ParseModel.prototype.save.apply(this, arguments);
    console.log(this.state);
  },
  saveAppetizer: function(key, val, options){
    this.set('appetizer', this.get('appetizer').toJSON());
    return ParseModel.prototype.save.apply(this, arguments);
  },
  saveMainCourse: function(key, val, options){
    this.set('maincourse', this.get('maincourse').toJSON());
    return ParseModel.prototype.save.apply(this, arguments);
  },
  saveDessert: function(key, val, options){
    this.set('dessert', this.get('dessert').toJSON());
    return ParseModel.prototype.save.apply(this, arguments);
  },
  parse: function(data){
    data.specials = new SpecialCollection(data.specials);
    data.appetizer = new AppetizerCollection(data.appetizer);
    data.maincourse = new MainCourseCollection(data.maincourse);
    data.dessert = new DessertCollection(data.dessert);
    delete data.favorite;
    return data;
  },
});

var BusinessCollection = ParseCollection.extend ({
  model: Business,
  baseUrl: 'https://matias-recipe.herokuapp.com/classes/Business'
  // url: function (){
  //   console.log('object id for where', this.objectId);
  //   var querystring = '?where={"owner": {"__type": "Pointer", "className": "_User", "objectId": "'+ this.objectId +' " }}';
  //   return 'https://matias-recipe.herokuapp.com/classes/Business' + querystring;
  // }
});

// var Favorite = ParseModel.extend({
//   defaults: {
//     favorite: '',
//   },
// });
//
// var FavoriteCollection = ParseCollection.extend({
//   model: Favorite,
// });

/**
*Yelp Ajax Call through proxy
*/
var YelpBusiness = Backbone.Model.extend({
  urlRoot: function(){
    var phone = User.current().get('phone');
    return 'https://yelp-proxy-server.herokuapp.com/api?phone=+1'  + '-' + phone;
  },
  parse: function(data){
    return data.businesses[0]
  },
});

// var GoogleMaps = Backbone.Model.extend ({
//   urlRoot: function(){
//     console.log('testing google model');
//     return 'https://maps.googleapis.com/maps/api/staticmap?center=34.84355,-82.40467&zoom=16&size=250x250&scale=2&maptype=roadmap&markers=icon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=restaurant%257C996600%7C34.84355,-82.40467&key=AIzaSyAf8NIWecbThX7FKm5y5cQlFd5wGeBjhoU';
//   },
//   parse: function(data){
//     return data.businesses[0]
//   },
// });


module.exports = {
  Special: Special,
  SpecialCollection: SpecialCollection,
  Appetizer: Appetizer,
  AppetizerCollection: AppetizerCollection,
  MainCourse: MainCourse,
  MainCourseCollection: MainCourseCollection,
  Dessert: Dessert,
  DessertCollection: DessertCollection,
  Business: Business,
  BusinessCollection: BusinessCollection,
  YelpBusiness: YelpBusiness,
  // GoogleMaps: GoogleMaps,
  // Favorite: Favorite,
  // FavoriteCollection: FavoriteCollection,
};
