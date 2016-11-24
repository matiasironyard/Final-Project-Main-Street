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
    var specials = restaurant.get('specials');
    console.log(specials);
    var test = this.props.

    return(
      <div className="row-fluid detailview-pane">
        <div className="col-md-12 detailview-header">
          <div className="col-md-4 detailview-header-img">
            <img src={restaurant.get('image_upload')}></img>
          </div>
          <div className="col-md-8 detailview-header-text">
            <h1 className="detailview-header-name">
              {restaurant.get('name')}
            </h1>
            <h4 className="detailview-header-cat">
              {restaurant.get('mainCategory')}
            </h4>
            <h5 className="detailview-header-cat">
              {restaurant.get('subCategory')}
            </h5>
            <p className="detailview-phone">{restaurant.get('phone')}</p>
            <img className="detailview-header-review-img">{restaurant.get('rating_img_url')}</img>
          </div>
        </div>
        <div className="col-md-4 detailview-pane">
          <div className="detailview-description">
            <p>{restaurant.get('description')}</p>
          </div>
          <div className="detailview-description">
            <img src={restaurant.get('snippet_image_url')}/>
            <p>{restaurant.get('snippet_text')}</p>
          </div>
          <div className="detailview-menu">
            <a href={restaurant.get('menu_upload')}>menu</a>
          </div>
          <div className="detailview-location-pane">
            <img src={restaurant.get('menu_upload')}/>
            <h5>Address</h5>
            <p>{restaurant.get('address')}</p>
            <p>{restaurant.get('city')}, {restaurant.get('state')}, {restaurant.get('zip')}</p>
          </div>
        </div>
        <div className="col-md-7 col-md-offset-1 detailview-specials">
          <ul className="detailview-specials-ul">
            <li className="detailview-specials-li">
              Specials go here
            </li>
          </ul>
        </div>
      </div>
    )
  }
});

var SingleViewContainer = React.createClass({
  getInitialState: function(){
    return {
      restaurant: new models.Business()
    }
  },
  componentWillMount: function(){
    var restaurant = this.state.restaurant;
    console.log('this state business', this.state.restaurant);
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
    var test = this.state.restaurant.get('name');
    console.log('1b test', test);
    var specials = this.state.restaurant.get('specials');
    console.log('specials',specials);
    return (
      <div>
        <DetailView restaurant={this.state.restaurant}/>
      </div>
    )
  },
});

module.exports = {
  SingleViewContainer: SingleViewContainer
};
