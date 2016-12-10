var React = require('react');
var Backbone = require('backbone');
var RegistrationContainer = require('../components/registration.jsx').RegistrationContainer;
var Dashboard = require('../components/registration.jsx').Dashboard;
var models = require('../models/business');
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
var AppetizerCollection = require('../models/business.js').AppetizerCollection;
var Appetizer = require('../models/business.js').Appetizer;




var BreakfastForm= React.createClass({
  getInitialState: function(){

    return {
      showDivider: false,
      showItem: true,
    };
  },
  //
  // componentWillReceiveProps: function(newProps){
  //   this.setState(newProps.maincourse);
  //   // this.setState(id, this.props.speical.cid)
  // },

  handleInputChange: function(e){
    var target = e.target;
    // var newState = {};
    // newState[target.name] = target.value;
    // this.setState(newState);
    this.props.breakfast.set(target.name, target.value);
    this.forceUpdate();
    console.log(target);
  },

  removeBreakfast: function(e){
    var breakfast = this.props.breakfast;
    this.props.removeBreakfast(breakfast)
  },

  render: function(){
    var breakfast = this.props.breakfast;
    // console.log(special.get('expirydate'))
    return(
      <div className="menu-forms breakfast">
            <div className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control"  onChange={this.handleInputChange} name="name"  value={breakfast.get('name')} type="text"  id="name" placeholder="dish name"/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input className="form-control"  id="myContentEditable" onChange={this.handleInputChange} name="description"  value={breakfast.get('description')} type="text"  id="description" placeholder="dish description"/>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input className="form-control"  onChange={this.handleInputChange} name="price"  value={breakfast.get('price')} type="text"  id="price" placeholder="dish price"/>
      </div>
        <div>
          <button  onClick = {this.removeBreakfast} type="button" className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect pull-right"><i className="material-icons">delete_forever</i></button>
        </div>
      </div>
    );
  }
});

var BreakfastFormSet = React.createClass({
  // getInitialState: function(){
  //   return this.props.business.toJSON();
  // },
  //
  // componentWillReceiveProps: function(newProps){
  //   this.setState(newProps.business.toJSON());
  // },

  // handleInputChange: function(e){
  //   var target = e.target;
  //   var newState = {};
  //   newState[target.name]  = target.value;
  //   this.setState(newState);
  // },

  handleSubmit: function(e){
  e.preventDefault();
  // console.log('business', this.state);
  this.props.saveBreakfast();
},

removeBreakfast: function(breakfast){
    this.props.removeBreakfast(breakfast);
},

 render: function(){
   var self = this;
  //  var business= self.props.business;
   var breakfastFormset = this.props.breakfast.map(function(breakfastItem){
    //  console.log('get specials', business.get('specials'));
    console.log('breakfast', self.props.breakfast);

     return (
       <div key={breakfastItem.cid}>
         <BreakfastForm breakfast={breakfastItem} removeBreakfast={self.removeBreakfast}/>
       </div>
     )
   });
   return (
     <div className="menu-panels col-md-4">
       <form onSubmit={this.handleSubmit}>
         <h3>Breakfast</h3>
         <div className="form-inLine">
           {breakfastFormset}
          <button  type="button" onClick = {this.props.addBreakfast} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect"><i className="material-icons">add</i></button>
         </div>
         <br></br>
        <button  onClick={this.handleSubmit} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"><i className="material-icons">save</i></button>
       </form>
     </div>
   );
 }
});

module.exports = {
  BreakfastFormSet: BreakfastFormSet
}
