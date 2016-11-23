var React = require('react');
var Backbone = require('backbone');
var models = require('../models/business');


var DetailView = React.createClass({
  getInitialState: function(){
    return {
      restaurant: '',
    }
  },

  render: function(){
    var self = this;
    var restaurant = self.props.restaurant;
    console.log('2-detail view component', restaurant);

    return(
      <h1></h1>
    )
  }
});

var SingleViewContainer = React.createClass({
  getInitialState: function(){
    return {
      business: new models.Business()
    }
  },
  componentWillMount: function(){
    var restaurant = this.state.business;
    console.log('this state business', this.state.business);
    console.log('willmount', restaurant);
    var restaurantId = this.props.businessId;
    console.log('restaurant id', restaurantId)
    if(!restaurantId){
      return;
    }
    restaurant.set('objectId', restaurantId);
    restaurant.fetch().then(()=>{
      this.setState({restaurant: restaurant});
    });
  },
  render: function(){
    console.log('1-parent container state in render', this.state.restaurant);
    var test = this.state.restaurant;
    console.log('1b test', test.get('name'));
    return (
      <div>
        <h1>hi</h1>
        <DetailView restaurant={this.state.restaurant}/>
      </div>
    )
  },
});

module.exports = {
  SingleViewContainer: SingleViewContainer
}
