var React = require('react');
var Backbone = require('backbone');
var models = require('../models/business');
var DashboardContainer = require('./dashboard.jsx').DashboardContainer;
var Favorites= require('./favorites.jsx').FavoritesContainer;
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
    console.log('Search Listing very child>>', category);
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
      <div className="categories-bar col-md-12">
        {/*<h2 className="viewall-card-container-header">All Restaurants</h2>*/}
        <div className="categories-dropdown dropdown">
          <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span className="categories-heading">I'm in the mood for</span>
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
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
    return(
      <div className ="viewall-restaurant-card  mdl-card mdl-shadow--2dp col-md-3">
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
    console.log('Lisntin Render', self.props.restaurants);
    var restaurantList = self.props.restaurants.map(function(restaurant){
      console.log('2-map', restaurantList);
      return (
          <div key={restaurant.cid}>
            <ItemListing restaurants={restaurant}/>
          </div>
      );
    });
    return(
      <div className="viewall-cards-container col-md-12 ">
        {restaurantList}
      </div>
    )
  }
});


var ViewAllContainer= React.createClass({
  getInitialState: function(){
    return {
      businessCollection: new models.BusinessCollection(),
      businessCategoryCollection: new models.BusinessCollection()
    };
  },

  componentWillMount: function(){

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
    });
  },

  filterCategories: function(category){
    var restaurants = this.state.businessCollection;
    restaurants.fetch({
      'data': {'where':  {"mainCategory": category}}
    }).then(() => {
      this.setState({businessCollection: restaurants});
    });
  },

  removeFavorite: function(restaurant){
    var favorite = this.state.businessCollection;
    var currentUser = User.current().get('objectId');
    favorite.set('favorite', {"__op": "RemoveRelation", "objects": [ {__type: "Pointer", className: "_User", objectId: currentUser} ] } );
    favorite.save();
    console.log(this.state);
  },

  render: function(){
    console.log('1-Business Collection', this.state);
    return (
      <div className="viewall-container container">
      <div className="viewall-row row">
        <Favorites/>
        <div className=''>
          <Search   restaurants={this.state.businessCategoryCollection} filterCategories={this.filterCategories}/>
          <Listing restaurants={this.state.businessCollection} />
        </div>
      </div>
    </div>
    )
  }
});

module.exports = {
  ViewAllContainer: ViewAllContainer
};
