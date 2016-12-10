var React = require('react');
var Backbone = require('backbone');
var RegistrationContainer = require('../components/registration.jsx').RegistrationContainer;
var Dashboard = require('../components/registration.jsx').Dashboard;
var models = require('../models/business');
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User = require('../parseUtilities').User;

var DessertForm= React.createClass({
  // getInitialState: function() {
  //
  //   return {
  //     dessert: this.props.dessert,
  //   };
  // },
  //
  // componentWillReceiveProps: function(newProps) {
  //   this.setState(newProps.dessert);
  //   // this.setState(id, this.props.speical.cid)
  // },

  handleInputChange: function(e) {
    var target = e.target;
    // var newState = {};
    // newState[target.name] = target.value;
    // this.setState(newState);
    this.props.desserts.set(target.name, target.value);
    this.forceUpdate();
    console.log(target);
  },

  removeDessert: function(e) {
    var dessert = this.props.desserts;
    this.props.removeDessert(dessert)
    console.log('remove dessert:', this.state);
  },

  render: function() {
    var desserts = this.props.desserts;
    // console.log(special.get('expirydate'))
    return (
      <div className="menu-forms desserts">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className="form-control"  onChange={this.handleInputChange} name="name"  value={desserts.get('name')} type="text"  id="name" placeholder="dish name"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input className="form-control"  id="myContentEditable" onChange={this.handleInputChange} name="description"  value={desserts.get('description')} type="text"  id="description" placeholder="dish description"/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input className="form-control"  onChange={this.handleInputChange} name="price"  value={desserts.get('price')} type="text"  id="price" placeholder="dish price"/>
        </div>
        <div>
          <button  onClick = {this.removeDessert} type="button" className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect pull-right"><i className="material-icons">delete_forever</i></button>
        </div>
      </div>
    );
  }
});

var DessertFormSet = React.createClass({
  // getInitialState: function() {
  //   return this.props.business.toJSON();
  // },
  //
  // componentWillReceiveProps: function(newProps) {
  //   this.setState(newProps.business.toJSON());
  // },

  // handleInputChange: function(e) {
  //   var target = e.target;
  //   // var newState = {};
  //   // newState[target.name] = target.value;
  //   this.setState(newState);
  // },

  handleSubmit: function(e) {
    e.preventDefault();
    // console.log('business', this.state);
    this.props.saveDessert();
  },

  removeDessert: function(dessert) {
    this.props.removeDessert(dessert);
  },

  render: function() {
    var self = this;
    // var business = self.props.business;
    var dessertFormset = this.props.desserts.map(function(dessertItem) {
      //  console.log('get specials', business.get('specials'));
      return (
        <div key={dessertItem.cid}>
         <DessertForm desserts={dessertItem} removeDessert={self.removeDessert}/>
       </div>
      )
    });
    return (
      <div className="menu-panels dashboard-dessert col-md-4">
       <form onSubmit={this.handleSubmit}>
         <h3>Desserts</h3>
         <div className="form-inLine">
           {dessertFormset}
          <button  type="button" onClick = {this.props.addDessert} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect"><i className="material-icons">add</i></button>
         </div>
         <br></br>
        <button  onClick={this.handleSubmit}  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"><i className="material-icons">save</i></button>
       </form>
     </div>
    );
  }
});

module.exports = {
  DessertFormSet: DessertFormSet
}
