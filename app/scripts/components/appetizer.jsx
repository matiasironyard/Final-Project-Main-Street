var React = require('react');
var Backbone = require('backbone');
var RegistrationContainer = require('../components/registration.jsx').RegistrationContainer;
var Dashboard = require('../components/registration.jsx').Dashboard;
var models = require('../models/business');
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
var AppetizerCollection = require('../models/business.js').AppetizerCollection;
var Appetizer = require('../models/business.js').Appetizer;
var moment = require('moment');




var AppetizerFormList = React.createClass({
  getInitialState: function(){

    return {
      appetizer: this.props.appetizer,
    };
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.appetizer);
    // this.setState(id, this.props.speical.cid)
  },

  handleInputChange: function(e){
    var target = e.target;
    var newState = {};
    newState[target.name] = target.value;
    this.setState(newState);
    this.props.appetizer.set(target.name, target.value);
    console.log(target);
  },

  removeAppetizer: function(e){
    var appetizer = this.state.appetizer;
    this.props.removeAppetizer(appetizer)
  },

  render: function(){
    var appetizer = this.state.appetizer;
    // console.log(special.get('expirydate'))
    return(
      <div className="appetizers">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className="form-control" className="form-control"  onChange={this.handleInputChange} name="name"  value={appetizer.get('name')} type="text"  id="name" placeholder="dish name"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input className="form-control" className="form-control"  id="myContentEditable" onChange={this.handleInputChange} name="description"  value={appetizer.get('description')} type="text"  id="description" placeholder="dish description"/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input className="form-control" className="form-control"  onChange={this.handleInputChange} name="price"  value={appetizer.get('price')} type="text"  id="price" placeholder="dish price"/>
        </div>
        <button  onClick = {this.removeAppetizer} type="button" className="btn btn-danger pull-right">Delete</button>
        <div>
        </div>
      </div>
    );
  }
});

var AppetizerForm = React.createClass({
  getInitialState: function(){
    return this.props.business.toJSON();
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.business.toJSON());
  },

  handleInputChange: function(e){
    var target = e.target;
    var newState = {};
    newState[target.name]  = target.value;
    this.setState(newState);
  },

  handleSubmit: function(e){
  e.preventDefault();
  // console.log('business', this.state);
  this.props.saveAppetizer(this.state);
},

removeAppetizer: function(appetizer){
    this.props.removeAppetizer(appetizer);
},

 render: function(){
   var self = this;
   var business= self.props.business;
   var appetizerFormset = business.get('appetizer').map(function(appetizerItem){
    //  console.log('get specials', business.get('specials'));
     return (
       <div key={appetizerItem.cid}>
         <AppetizerFormList appetizer={appetizerItem} removeAppetizer={self.removeAppetizer}/>
       </div>
     )
   });
   return (
     <div className="col-md-4">
       <form onSubmit={this.handleSubmit}>
         <h3>Appetizers</h3>
         <div className="form-inLine">
           {appetizerFormset}
           <button  type="button" onClick = {this.props.addAppetizer} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Add Another</button>
         </div>
         <br></br>
        <button  onClick={this.handleSubmit} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Save Appetizer</button>
       </form>
     </div>
   );
 }
});

module.exports = {
  AppetizerForm: AppetizerForm
}
