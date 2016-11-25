var React = require('react');
var Backbone = require('backbone');
var RegistrationContainer = require('../components/registration.jsx').RegistrationContainer;
var Dashboard = require('../components/registration.jsx').Dashboard;
var models = require('../models/business');
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
var Form = require('muicss/lib/react/form');
var Input = require('muicss/lib/react/input');
var Button = require('muicss/lib/react/button');




var DessertFormList = React.createClass({
  getInitialState: function(){

    return {
      dessert: this.props.dessert,
    };
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.dessert);
    // this.setState(id, this.props.speical.cid)
  },

  handleInputChange: function(e){
    var target = e.target;
    var newState = {};
    newState[target.name] = target.value;
    this.setState(newState);
    this.props.dessert.set(target.name, target.value);
    console.log(target);
  },

  removeDessert: function(e){
    var dessert = this.state.dessert;
    this.props.removeDessert(dessert)
  },

  render: function(){
    var dessert = this.state.dessert;
    // console.log(special.get('expirydate'))
    return(
      <div className="desserts">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Input  onChange={this.handleInputChange} name="name"  value={dessert.get('name')} type="text"  id="name" placeholder="dish name"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <Input  id="myContentEditable" onChange={this.handleInputChange} name="description"  value={dessert.get('description')} type="text"  id="description" placeholder="dish description"/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <Input  onChange={this.handleInputChange} name="price"  value={dessert.get('price')} type="text"  id="price" placeholder="dish price"/>
        </div>
        <div>
          <Button variant="raised" onClick = {this.removeSpecial} type="button" className="btn btn-danger pull-right">Delete</Button>
        </div>
      </div>
    );
  }
});

var DessertForm = React.createClass({
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
  this.props.saveDessert(this.state);
},

removeDessert: function(dessert){
    this.props.removeDessert(dessert);
},

 render: function(){
   var self = this;
   var business= self.props.business;
   var dessertFormset = business.get('dessert').map(function(dessertItem){
    //  console.log('get specials', business.get('specials'));
     return (
       <div key={dessertItem.cid}>
         <DessertFormList dessert={dessertItem} removeDessert={self.removeDessert}/>
       </div>
     )
   });
   return (
     <div className="col-md-4">
       <Form onSubmit={this.handleSubmit}>
         <h3>Desserts</h3>
         <div className="form-inLine">
           {dessertFormset}
          <Button variant="raised" type="button" onClick = {this.props.addDessert} className="btn btn-primary">Add Another</Button>
         </div>
         <br></br>
        <Button variant="raised" type="submit" className="btn btn-success">Save Dessert</Button>
       </Form>
     </div>
   );
 }
});

module.exports = {
  DessertForm: DessertForm
}
