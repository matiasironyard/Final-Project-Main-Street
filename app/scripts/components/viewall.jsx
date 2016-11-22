var React = require('react');
var Backbone = require('backbone');
var models = require('../models/business');

var SearchListing = React.createClass({
  getInitialState: function(){
    return this.props.restaurants;
  },

  handleSearch: function(){
    var self = this;
    var category = self.props.restaurants.get('mainCategory');
    console.log('Search Listing very child>>', category);
    self.props.filterCategories(category);
    self.setState({restaurants: category})
  },
  render: function(){
    var categories = this.props.restaurants;
    return(
      <a onClick={this.handleSearch} >{categories.get('mainCategory')}</a>
    )
  }
});

var Search = React.createClass({
  getInitialState: function(){
    return this.props.restaurants;
  },

  // handleSearch: function(category){
  //   this.props.filterCategories(category);
  // },

  render: function(){
    var self = this;
    var categoriesList = self.props.restaurants.map(function(categories){
      return (
        <li key={categories.cid}>
          <SearchListing restaurants={categories}/>
        </li>
      );
    });
    return(
      <ul className="col-md-12">
        {categoriesList}
      </ul>
    )
  }
});

var ItemListing = React.createClass({
  render: function(){
    var restaurants = this.props.restaurants;
    // console.log('3-ItemListing', this.props.restaurants.attributes.specials.length);
    var specialsCounter = this.props.restaurants.attributes.specials.length;
    return(
      <div className ="col-md-4 restaurant-card" style={{"backgroundImage" : "url({restaurants.get(img_url)})"}}>
        <a href={'#restaurants/' + restaurants.get('objectId') + '/'} className="individual-item">
          <div className= "specials-counter">
            {specialsCounter}
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
      <div className="col-md-10 col-md-offset-1">
        {restaurantList}
      </div>
    )
  }
});


var ViewAllContainer= React.createClass({
  getInitialState: function(){
    return {
      BusinessCollection: new models.BusinessCollection()
    };
  },

  componentWillMount: function(){
    var BusinessCollection = this.state.BusinessCollection;
    BusinessCollection.fetch().then(() => {
      this.setState({BusinessCollection: BusinessCollection});
    });
  },

  filterCategories: function(category){
    var restaurants = this.state.BusinessCollection;
    this.setState({BusinessCollection: restaurants})
  },

  render: function(){
    // console.log('1-Business Collection', this.state);
    return (
      <div>
      <Search restaurants={this.state.BusinessCollection} filterCategories={this.filterCategories}/>
      <Listing restaurants={this.state.BusinessCollection}/>
      </div>
    )
  }
});


module.exports = {
  ViewAllContainer: ViewAllContainer
};