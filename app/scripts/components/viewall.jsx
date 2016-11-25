var React = require('react');
var Backbone = require('backbone');
var models = require('../models/business');
var Panel = require('muicss/lib/react/panel');
var Dropdown = require('muicss/lib/react/dropdown');
var DropdownItem = require('muicss/lib/react/dropdown-item');

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
      <div className="col-sm-4 col-sm-offset-3 categories-dropdown">
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
    // console.log('3-ItemListing', this.props.restaurants.attributes.specials.length);
    var specialsCounter = this.props.restaurants.attributes.specials.length;
    var backgroundImage = restaurants.get('img_url');
    // style={{"backgroundImage" : "url(http://www.culinaryschools.org/images/restaurant-kitchen.jpg)"}
    return(
      <div className ="col-sm-3 restaurant-card">
        <a href={'#restaurants/' + restaurants.get('objectId') + '/'} className="individual-item">
          <div className= "specials-counter">
            <div className="counter-number">{specialsCounter}</div>
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
    var restaurantList = self.props.restaurants.map(function(restaurant){
      // console.log('2-map', restaurantList);
      return (
          <div key={restaurant.cid}>
            <ItemListing restaurants={restaurant}/>
          </div>
      );
    });
    return(
      <div className="col-sm-8 col-sm-offset-2">
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
    console.log('category', category);
    var restaurants = this.state.businessCollection;
    // var business = this.state.Business;

    restaurants.fetch({
      'data': {'where':  {"mainCategory": category}}
    }).then(() => {
      this.setState({businessCollection: restaurants});
    });
  },

  render: function(){
    // console.log('1-Business Collection', this.state);
    return (
      <div>
      <Search  restaurants={this.state.businessCategoryCollection} filterCategories={this.filterCategories}/>
      <Listing restaurants={this.state.businessCollection} />
      </div>
    )
  }
});


module.exports = {
  ViewAllContainer: ViewAllContainer
};
