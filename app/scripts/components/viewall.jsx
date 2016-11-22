var React = require('react');
var Backbone = require('backbone');
var models = require('../models/business');

var ItemListing = React.createClass({

  render: function(){
    var restaurants = this.props.restaurants;
    console.log('3-ItemListing', this.props.restaurants);
    return(
      <div className ="col-md-3 restaurant-individual-item">
        <a href={'#restaurants/' + restaurants.get('objectId') + '/'} className="individual-item">{restaurants.get('name')}</a>
          <p>{restaurants.get('mainCategory')}</p>

      </div>
    )
  }
});

var Listing = React.createClass({
  render: function(){
    var self = this;
    console.log('2-listing', self.props.restaurants);
    var restaurantList = self.props.restaurants.map(function(restaurant){
      console.log('2-map', restaurantList);
      return (
        <div key={restaurant.cid}>
          <ItemListing restaurants={restaurant}/>
        </div>
      );
    });
    return(
      <div className="col-md-8">
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

  render: function(){
    console.log('1-Business Collection', this.state);
    return (
      <div>
      <Listing restaurants={this.state.BusinessCollection}/>
      </div>
    )
  }
});


module.exports = {
  ViewAllContainer: ViewAllContainer
};
