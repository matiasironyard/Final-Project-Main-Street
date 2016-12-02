var Backbone = require('backbone');
var Business = require('../components/authentication.jsx').AuthenticationContainer;
var User = require('../parseUtilities.js').User;

/**************************************************************************************
PARSE
**************************************************************************************/

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  save: function(key, val, options){    //delete the following so that we don't get a mismatch error when posting.
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;
    return Backbone.Model.prototype.save.apply(this, arguments);
  },
});

var ParseCollection = Backbone.Collection.extend({
  whereClause: {field: '', className: '', objectId: ''},
  /*set up a 'parseWhere' method in order to successfully post to Parse server. See docs @*/ /*parseplatform.github.io/docs/rest/guide/#relational-queries*/

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
    return data.results;
  },
});

/**************************************************************************************
MENU MODELS & COLLECTIONS
**************************************************************************************/
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

/**************************************************************************************
BUSEINESS MODELS & COLLECTIONS
**************************************************************************************/

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

  /**************************************************************************************
  SAVE FUNCTIONS
  **************************************************************************************/

  save: function(key, val, options){
    this.set('specials', this.get('specials').toJSON());
    this.set('appetizer', this.get('appetizer').toJSON());
    this.set('maincourse', this.get('maincourse').toJSON());
    this.set('dessert', this.get('dessert').toJSON());

    return ParseModel.prototype.save.apply(this, arguments);
  },
  parse: function(data){
    data.specials = new SpecialCollection(data.objectId ? data.specials : this.get('specials'));
    data.appetizer = new AppetizerCollection(data.objectId ? data.appetizer : this.get('appetizer'));
    data.maincourse = new MainCourseCollection(data.objectId ? data.maincourse : this.get('maincourse'));
    data.dessert = new DessertCollection(data.objectId ? data.dessert : this.get('dessert'));
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

 /**************************************************************************************
  YELP MODEL
  **************************************************************************************/
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

/**************************************************************************************
EXPORTS
**************************************************************************************/
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
