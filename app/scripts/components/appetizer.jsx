var React = require('react');
var Backbone = require('backbone');
var RegistrationContainer = require('../components/registration.jsx').RegistrationContainer;
var Dashboard = require('../components/registration.jsx').Dashboard;
var models = require('../models/business');
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User = require('../parseUtilities').User;
var AppetizerCollection = require('../models/business.js').AppetizerCollection;
var Appetizer = require('../models/business.js').Appetizer;
var moment = require('moment');

var AppetizerForm= React.createClass({
  // getInitialState: function() {
  //
  //   return {
  //     appetizer: this.props.appetizer,
  //   };
  // },
  //
  // componentWillReceiveProps: function(newProps) {
  //   this.setState(newProps.appetizer);
  //   // this.setState(id, this.props.speical.cid)
  // },

  handleInputChange: function(e) {
    var target = e.target;
    // var newState = {};
    // newState[target.name] = target.value;
    // this.setState(newState);
    this.props.appetizers.set(target.name, target.value);
    this.forceUpdate();
    console.log(target);
  },

  removeAppetizer: function(e) {
    var appetizer = this.props.appetizers;
    this.props.removeAppetizer(appetizer)
  },

  render: function() {
    var appetizers = this.props.appetizers;
    // console.log(special.get('expirydate'))
    return (
      <div className="menu-forms appetizers">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className="form-control" className="form-control"  onChange={this.handleInputChange} name="name"  value={appetizers.get('name')} type="text"  id="name" placeholder="dish name"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input className="form-control" className="form-control"  id="myContentEditable" onChange={this.handleInputChange} name="description"  value={appetizers.get('description')} type="text"  id="description" placeholder="dish description"/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input className="form-control" className="form-control"  onChange={this.handleInputChange} name="price"  value={appetizers.get('price')} type="text"  id="price" placeholder="dish price"/>
        </div>
        <button  onClick = {this.removeAppetizer} type="button" className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect pull-right"><i className="material-icons">delete_forever</i></button>
        <div>
        </div>
      </div>
    );
  }
});

var AppetizerFormSet = React.createClass({
  getInitialState: function() {
          return ({
            showComponent: false,
          });
      },

  onClick: function() {
      this.setState({ showComponent: true });
  },
  onClickClose: function() {
      this.setState({ showComponent: false });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    // console.log('business', this.state);
    this.props.saveAppetizer();
  },

  removeAppetizer: function(appetizer) {
    this.props.removeAppetizer(appetizer);
  },

  render: function() {
    var self = this;
    // var business = self.props.business;
    var appetizerFormset = this.props.appetizers.map(function(appetizerItem) {
      //  console.log('get specials', business.get('specials'));
      return (
        <div key={appetizerItem.cid}>
         <AppetizerForm appetizers={appetizerItem} removeAppetizer={self.removeAppetizer}/>
       </div>
      )
    });
    return (
      <div className="menu-panels col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 mdl-shadow--3dp">
        <div className="header ">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Appetizers</h2>
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
           {appetizerFormset}
           <button  type="button" onClick = {this.props.addAppetizer} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect"><i className="material-icons">add</i></button>
         </div>
         <br></br>
        <button  onClick={this.handleSubmit}  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"><i className="material-icons">save</i></button>
       </form>: null}
     </div>
    );
  }
});

module.exports = {
  AppetizerFormSet: AppetizerFormSet
}
