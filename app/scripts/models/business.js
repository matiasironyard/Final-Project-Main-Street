var Backbone = require('backbone');

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
  }
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

    if(this.whereClause.field){
          var field = this.whereClause.field;
          delete this.whereClause.field;
          url += '?where={"' + field + '":' + JSON.stringify(this.whereClause) + '}';
        }

    return url;
  },
  parse: function(data){
    return data.results;
  }
});

/**
*Specials Model and Collections
*/

var Special = ParseModel.extend ({
  defaults: {
    date: '',
    expiration: '',
    name: '',
    description: '',
    price: '',
    picture: '',
  },
});

var SpecialCollection = ParseCollection.extend ({
  model: Special,
  baseUrl: 'https://matias-recipe.herokuapp.com/classes/Specials'
});

/**
*Business Model and Collections
*/
var YelpBusiness = Backbone.Model.extend({
  urlRoot: 'https://yelp-proxy-server.herokuapp.com/api?phone=+1-864-351-0521',
  parse: function(data){
    return data.businesses[0]
  },
});
var Business = ParseModel.extend ({
  defaults: {
    name: '',
    category: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    imageUrl: '',
    rating: '',
    isclosed: '',
    specials: new SpecialCollection(),
  },
  urlRoot: 'https://matias-recipe.herokuapp.com/classes/Business',

  save: function(key, val, options){
    this.set('specials', this.get('specials').toJSON());
    return ParseModel.prototype.save.apply(this, arguments);
  },
  parse: function(data){
    data.specials = new SpecialCollection(data.specials);
    return data;
  }
});

var BusinessCollection = ParseCollection.extend ({
  model: Business,
  url: 'https://matias-recipe.herokuapp.com/classes/Business'
})


module.exports = {
  Special: Special,
  SpecialCollection: SpecialCollection,
  Business: Business,
  BusinessCollection: BusinessCollection,
  YelpBusiness: YelpBusiness,
};
