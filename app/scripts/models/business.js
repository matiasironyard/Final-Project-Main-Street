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
  saveMenu: function(key, val, options){    //delete the following so that we don't get a mismatch error when posting.
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
  parse2: function(data){
    // console.log('parse data/parse-where', data.results[0].phone);
    return data.results;
  },

});

/**
*Specials Model and Collections
*/
var Menu = ParseModel.extend ({
idAttribute: 'cid',
  defaults: {
    name: '',
    description: '',
    category: '',
    price: '',
  },
});

var MenuCollection = ParseCollection.extend ({
  model: Menu,
  baseUrl: 'https://matias-recipe.herokuapp.com/classes/Menu'
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
*Yelp Ajax Call through proxy
*/
var phone = User.current().get('phone');
// console.log('model get phone from current user', phone);
var YelpBusiness = Backbone.Model.extend({
  urlRoot: 'https://yelp-proxy-server.herokuapp.com/api?phone=+' + phone,
  parse: function(data){
    return data.businesses[0]
  },
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
    menu: new MenuCollection(),
  },
  urlRoot: 'https://matias-recipe.herokuapp.com/classes/Business',

  saveSpecial: function(key, val, options){
    this.set('specials', this.get('specials').toJSON());
    return ParseModel.prototype.save.apply(this, arguments);
    console.log(this.state);
  },
  saveMenu: function(key, val, options){
    this.set('menu', this.get('menu').toJSON());
    return ParseModel.prototype.save.apply(this, arguments);
  },
  parse: function(data){
    data.specials = new SpecialCollection(data.specials);
    data.menu = new MenuCollection(data.menu);
    return data;
  },
  parse2: function(data){
    // data.specials = new SpecialCollection(data.specials);
    data.menu = new MenuCollection(data.menu);
    return data;
  }
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

var GoogleMaps = ParseModel.extend ({
  defaults: {
    url: '',
  },
  urlRoot: 'https://maps.googleapis.com/maps/api/staticmap',
});


module.exports = {
  Special: Special,
  SpecialCollection: SpecialCollection,
  Menu: Menu,
  MenuCollection: MenuCollection,
  Business: Business,
  BusinessCollection: BusinessCollection,
  YelpBusiness: YelpBusiness,
  GoogleMaps: GoogleMaps,
};
