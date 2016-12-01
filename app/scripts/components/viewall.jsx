var React = require('react');
var Backbone = require('backbone');
var models = require('../models/business');
var Dashboard = require('./dashboard.jsx').Dashboard;
var Favorites= require('./favorites.jsx').FavoritesContainer;
var Template = require('../templates/templates.jsx');
var YelpBusiness = require('../models/business.js').YelpBusiness;
var yelpBusiness = new YelpBusiness();


var Panel = require('muicss/lib/react/panel');
var Dropdown = require('muicss/lib/react/dropdown');
var DropdownItem = require('muicss/lib/react/dropdown-item');
var moment = require('moment');

// Make bootstrap dropdown work
var $ = window.jQuery = require('jquery');
require('bootstrap-sass');


var SearchListing = React.createClass({
  getInitialState: function(){
    return this.props.restaurants;
  },

  handleSearch: function(e){
    e.preventDefault();
    var self = this;
    var category = self.props.restaurants.get('mainCategory');
  // console.log('Search Listing very child>>', category);
    self.props.filterCategories(category);
    self.setState({restaurants: category})
  },
  render: function(){
    var categories = this.props.restaurants;
    return(
      <p onClick={this.handleSearch} > {categories.get('mainCategory')}</p>
    )
  }
});

var Search = React.createClass({
  getInitialState: function(){
    return this.props.restaurants;
  },

  handleSearch: function(category){
    this.props.filterCategories(category);
  },

  render: function(){
    var self = this;
    var categoriesList = self.props.restaurants.map(function(categories){
      return (
          <li key={categories.cid}>
            <a><SearchListing restaurants={categories} filterCategories={self.handleSearch}/></a>
          </li>
      );
    });
    return(
      <div className="categories-bar row">
        {/*<h2 className="viewall-card-container-header">All Restaurants</h2>*/}
        <div className="categories-dropdown dropdown col-md-10 col-md-offset-1 col-sm-11 col-xs-11">
          <button className="btn col-md-offset-4 btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span className="categories-heading">I'm in the mood for</span>
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu col-md-offset-4" aria-labelledby="dropdownMenu1">
            {categoriesList}
          </ul>
        </div>
      </div>
    )
  }
});

var ItemListing = React.createClass({
  render: function(){
    var restaurants = this.props.restaurants;
    var specialsCounter = this.props.restaurants.attributes.specials.length;
    var backgroundImage = restaurants.get('img_url');
    // style={{"backgroundImage" : "url(http://www.culinaryschools.org/images/restaurant-kitchen.jpg)"}

    //Not so dry code trying to trigger removeSpecial function from dashboard
    // var specials = restaurants.get('specials');
    // var expiryDate = specials.map(function(date){
    //   return date.get('expirydate');
    // });
    // console.log('expires on', expiryDate, 'restaurant', restaurants.get('name'));
    // var now = moment();
    // var formatedDate = now.format("YYYY-MM-DD");
    // console.log('delete special trigger >>', formatedDate == expiryDate);
    // if(formatedDate == expiryDate){
    //   Dashboard.removeSpecial(special);
    //   console.warn("Special Deleted >>");
    //   console.log(Dashboard.removeSpecial(special));
    // };
    return(
      <div className ="viewall-restaurant-card mdl-shadow--2dp col-md-3 col-sm-5 col-xs-5">
          <div className="viewall-header restaurant-card-header">
            <a href={'#restaurants/' + restaurants.get('objectId') + '/'} className="individual-item"><img className="viewall-image" src={restaurants.get('image_url')}/></a>
            <span className="viewall-counter mdl-badge pull-right" data-badge={specialsCounter}>Specials</span>
            <div  className="viewall-name ">{restaurants.get('name')}</div>
            <p className="viewall-category mdl-card__title-text">{restaurants.get('mainCategory')}</p>
          </div>
          <div className="viewall-restaurant-info mdl-card__actions mdl-card--border">
            {/*<p className="viewall-description">{restaurants.get('description')}</p>?*/}
            <p className="viewall-status pull-right">{restaurants.get('is_closed')}</p>
          </div>
      </div>
    )
  }
});

var Listing = React.createClass({
  render: function(){
    var self = this;
    // console.log('2-listing', self.props.restaurants);
  // console.log('Lisntin Render', self.props.restaurants);
    var restaurantList = self.props.restaurants.map(function(restaurant){
    // console.log('2-map', restaurantList);
      return (
          <div key={restaurant.cid}>
            <ItemListing restaurants={restaurant}/>
          </div>
      );
    });
    return(
      <div className="viewall-cards-container row">
        <div className="vieall-cards-col col-md-10 col-md-offset-2 col-md-offset-1 col-sm-12 col-xs-12">
          {restaurantList}
        </div>
      </div>
    )
  }
});


var ViewAllContainer= React.createClass({
  getInitialState: function(){
    return {
      businessCollection: new models.BusinessCollection(),
      businessCategoryCollection: new models.BusinessCollection(),
      specialsCollection: new models.SpecialCollection(),
      business: new models.Business(),
    };
  },

  componentWillMount: function(){
    var self = this;
    var businessCollection = this.state.businessCollection;
  {/* Sort collection by name */}
    businessCollection.comparator = 'name';
    {/* Fetch collection, then create a second colleciton in order to sort categories */}
    businessCollection.fetch().then(() => {
      var categories = this.state.businessCategoryCollection;
      var uniqueCategories = businessCollection.pluck('mainCategory');
      var uniqueCollection = uniqueCategories.map(function(category){
        return businessCollection.findWhere({mainCategory: category});
      });
      categories.reset(uniqueCollection);
      this.setState({
        businessCollection: businessCollection,
        businessCategoryCollection: categories
      });
      // yelpBusiness.fetch().then(function(response){
      //   console.log('response', response);
      //   var open= response.businesses[0].is_closed ? response.businesses[0].is_closed = false: "currently open";
      //   console.log('open:', open);
      //   var business = new models.Business();
      //   var data = response.businesses[0];
      //   business.set(
      //     {
      //       is_closed: open,
      //     }
      //   ),
      //   self.setState({business: business});
      // });
    });

    // For Dan to check
    // var specialsCollection = this.state.businessCollection;
    // var self = this;
    //
    // specialsCollection.fetch().then(()=>{
    //   var expiredSearch = specialsCollection.map(function(restaurants){
    //     var restaurants = restaurants.get('specials');
    //     var map = restaurants.map(function(specials){
    //       console.log('restaurant with specials', specials);
    //       return businessCollection.findWhere({expirydate: restaurants});
    //     });
    //     console.log('mapped over', map);
    //   });
    // });
  },

  filterCategories: function(category){
    var restaurants = this.state.businessCollection;
    restaurants.fetch({
      'data': {'where':  {"mainCategory": category}}
    }).then(() => {
      this.setState({businessCollection: restaurants});
    });
  },

  // removeExpired: function(data){
  //   var specials = this.state.specialsCollection;
  //   restaurants.fetch({
  //     'data': {'where': {"expirydata": data}}
  //   }).then(() =>{
  //     this.setState({specialsCollection: specials})
  //   });
  //   console.log('removeExpired', this.state);
  // },

  removeFavorite: function(restaurant){
    var favorite = this.state.businessCollection;
    var currentUser = User.current().get('objectId');
    favorite.set('favorite', {"__op": "RemoveRelation", "objects": [ {__type: "Pointer", className: "_User", objectId: currentUser} ] } );
    favorite.save();
  // console.log(this.state);
  },

  render: function(){
  // console.log('1-Business Collection', this.state);
  // var businessCollection = this.state.businessCollection;
  // var expiryDateSearch = businessCollection.models.map(function(restaurants){
  //   return restaurants.get('specials')
  // });
  // var dates = expiryDateSearch.map(function(expired){
  //   return expired.toJSON()
  // });
  // console.log(dates.map(function(dates){
  //   console.log(dates.effectivedate);
  // }));
    return (
      <Template>
      <div className="viewall-container" >
      <div className="viewall-pane col-md-12 col-sm-11 col-xs-11">
        <div className=''>
          <Search   restaurants={this.state.businessCategoryCollection} filterCategories={this.filterCategories}/>
          <Listing restaurants={this.state.businessCollection} />
        </div>
      </div>
    </div>
    </Template>
    )
  }
});

module.exports = {
  ViewAllContainer: ViewAllContainer
};
