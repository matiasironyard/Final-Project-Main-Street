var React = require('react');
var Backbone = require('backbone');
var RegistrationContainer = require('../components/registration.jsx').RegistrationContainer;
var Dashboard = require('../components/registration.jsx').Dashboard;
var models = require('../models/business');
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
var AppetizerCollection = require('../models/business.js').AppetizerCollection;
var Appetizer = require('../models/business.js').Appetizer;




var DinnerForm= React.createClass({
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
    this.props.dinner.set(target.name, target.value);
    this.forceUpdate();
    console.log(target);
  },

  removeDinner: function(e){
    var dinner = this.props.dinner;
    this.props.removeDinner(dinner)
    console.log('remove dinner', this.state);
  },

  render: function(){
    var dinner = this.props.dinner;
    // console.log(special.get('expirydate'))
    return(
      <div className="menu-forms dinner">
            <div className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control"  onChange={this.handleInputChange} name="name"  value={dinner.get('name')} type="text"  id="name" placeholder="dish name"/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input className="form-control"  id="myContentEditable" onChange={this.handleInputChange} name="description"  value={dinner.get('description')} type="text"  id="description" placeholder="dish description"/>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input className="form-control"  onChange={this.handleInputChange} name="price"  value={dinner.get('price')} type="text"  id="price" placeholder="dish price"/>
      </div>
        <div>
          <button  onClick = {this.removeDinner} type="button"className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect pull-right"><i className="material-icons">delete_forever</i></button>
        </div>
      </div>
    );
  }
});

var DinnerFormSet = React.createClass({
  getInitialState: function() {
          return { showComponent: false };
      },

  onClick: function() {
      this.setState({ showComponent: true });
  },
  onClickClose: function() {
      this.setState({ showComponent: false });
  },

  handleSubmit: function(e){
  e.preventDefault();
  // console.log('business', this.state);
  this.props.saveDinner();
},

removeDinner: function(dinner){
    this.props.removeDinner(dinner);
    console.log(this.state);
},

 render: function(){
   var self = this;
  //  var business= self.props.business;
   var dinnerFormset = this.props.dinner.map(function(dinnerItem){
    //  console.log('get specials', business.get('specials'));
    console.log('dinner', self.props.dinner);

     return (
       <div key={dinnerItem.cid}>
         <DinnerForm dinner={dinnerItem} removeDinner={self.removeDinner}/>
       </div>
     )
   });
   return (
     <div className="menu-panels col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 mdl-shadow--3dp">
       <div className="header ">
         <div className="mdl-card__title">
           <h2 className="mdl-card__title-text">Dinner</h2>
         </div>
         <div className="mdl-card__supporting-text">
          <span>editor</span>
        </div>
         <div className="header-buttons mdl-card__actions mdl-card--border">
           <a className="mdl-button mdl-js-button mdl-button--raised pull-left" type="submit" onClick={this.onClick}>Show</a>
           <a className="mdl-button mdl-js-button mdl-button--raised pull-right" type="submit" onClick={this.onClickClose}>Hide</a>
         </div>
       </div>
       { this.state.showComponent ? <form onSubmit={this.handleSubmit}>
         <div className="form-inLine">
           {dinnerFormset}
          <button  type="button" onClick = {this.props.addDinner} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect"><i className="material-icons">add</i></button>
         </div>
         <br></br>
        <button  onClick={this.handleSubmit} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"><i className="material-icons">save</i></button>
       </form>:null}
     </div>
   );
 }
});

module.exports = {
  DinnerFormSet: DinnerFormSet
}
