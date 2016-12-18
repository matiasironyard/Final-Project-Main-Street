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
    console.log('appetizers', appetizers.length);
    // console.log(special.get('expirydate'))
    return (
      <div className="menu-forms appetizers col-md-8  col-md-offset-2 col-sm-11 col-sm-offset-1 col-xs-11 col-xs-offset-1">
        <h5>Dish: {appetizers.get('name')}</h5>
        <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
          <input className="mdl-textfield__input" onChange={this.handleInputChange} name="name"  value={appetizers.get('name')} type="text"  id="name" placeholder="dish name"/>
        </div>
        <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
          <input className="mdl-textfield__input" id="myContentEditable" onChange={this.handleInputChange} name="description"  value={appetizers.get('description')} type="text"  id="description" placeholder="dish description"/>
        </div>
        <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
          <input className="mdl-textfield__input"  onChange={this.handleInputChange} name="price"  value={appetizers.get('price')} type="text"  id="price" placeholder="dish price"/>
        </div>
        <a  onClick = {this.removeAppetizer} type="button" className="pull-right"><i className="material-icons">delete_forever</i></a>
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
            showBtn: false,
            hideBtn: true,
            editorClass: "menu-panels col-md-4 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 mdl-shadow--3dp"
          });
      },

  onClick: function() {
      this.setState({ showComponent: true });
      this.setState({showBtn: true});
      this.setState({hideBtn: false})
      this.setState({editorClass: "menu-panels col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 mdl-shadow--3dp"})
  },
  onClickCloseSave: function(e) {
    e.preventDefault();
      this.setState({ showComponent: false });
      this.setState({showBtn: false});
      this.setState({hideBtn: true})
      this.setState({editorClass: "menu-panels col-md-4 col-sm-11 col-sm-offset-1 col-xs-11 col-xs-offset-1 mdl-shadow--3dp"})
      this.props.saveAppetizer();
  },

  // handleSubmit: function(e) {
  //   e.preventDefault();
  //   // console.log('business', this.state);
  //   this.props.saveAppetizer();
  // },

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
      <div className={this.state.editorClass}>
        <div className="header ">
          <div className="mdl-card__title">
            <h5 className="menu-editor-title">Appetizers Editor</h5>
          </div>
          <div className="header-buttons mdl-card__actions mdl-card--border">
            {this.state.hideBtn ? <a className="mdl-button mdl-js-button mdl-button--raised pull-left" type="submit" onClick={this.onClick}>Show</a>:null}
            {this.state.showBtn ?<a className="mdl-button mdl-js-button mdl-button--raised pull-left" type="submit" onClick={this.onClickCloseSave}>Hide</a>:null}
            <span className="mdl-chip mdl-chip--contact pull-right">
                <span className="mdl-chip__contact mdl-color--orange mdl-color-text--white">{this.props.appetizers.length}</span>
                <span className="mdl-chip__text">Appetizers</span>
            </span>
          </div>
        </div>

       { this.state.showComponent ? <form onSubmit={this.handleSubmit}>
         <div className="form-inLine col-md-12">
           {appetizerFormset}
         </div>
         <a type="button" onClick = {this.props.addAppetizer}><i className="material-icons col-md-1 col-md-offset-5">add</i></a>

        {/*<button  onClick={this.handleSubmit}  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"><i className="material-icons">save</i></button>*/}
       </form>: null}
     </div>
    );
  }
});

module.exports = {
  AppetizerFormSet: AppetizerFormSet
}
