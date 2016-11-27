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
          <DropdownItem key={categories.cid}>
            <SearchListing restaurants={categories} filterCategories={self.handleSearch}/>
          </DropdownItem>
      );
    });
    return(
      <div className="col-sm-12 categories-dropdown">
        <Dropdown className="search-dropdown" variant="raised"   label="I'm in the mood for...">
          {categoriesList}
        </Dropdown>
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
      <div className ="col-md-5-fluid restaurant-card">
        <a href={'#restaurants/' + restaurants.get('objectId') + '/'} className="individual-item">
          <div className= "specials-counter">
            <div className="counter-number" style={styles.red}>{specialsCounter}</div>
          </div>
          <div className="restaurant-card-header">
            <img src={restaurants.get('image_url')}/>
            <h5>{restaurants.get('name')}</h5>
            <p>{restaurants.get('mainCategory')}</p>
          </div>
          <div className="restaurant-info">
            <p>{restaurants.get('is_closed')}</p>
            <p>{restaurants.get('description')}</p>
          </div>
        </a>
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
      <div className="col-md-9">
        <h2>All Restaurants</h2>
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

  render: function(){
    console.log('1-Business Collection', this.state);
    return (
      <div className="container">
      <div className="row">
        <Search  className="col-md-12" restaurants={this.state.businessCategoryCollection} filterCategories={this.filterCategories}/>
      </div>
      <div className="row">
        <Favorites className="col-md-3"/>
        <Listing className="col-md-8"restaurants={this.state.businessCollection} />
      </div>
    </div>
    )
  }
});

module.exports = {
  ViewAllContainer: ViewAllContainer
};
