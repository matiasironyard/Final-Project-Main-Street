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
      <div className="menu-forms appetizers col-md-8  col-md-offset-2 col-sm-11 col-sm-offset-1 col-xs-11 col-xs-offset-1">
        <h5>Dish: {desserts.get('name')}</h5>
        <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
          <input className="mdl-textfield__input"  onChange={this.handleInputChange} name="name"  value={desserts.get('name')} type="text"  id="name" placeholder="dish name"/>
        </div>
        <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
          <input className="mdl-textfield__input"  id="myContentEditable" onChange={this.handleInputChange} name="description"  value={desserts.get('description')} type="text"  id="description" placeholder="dish description"/>
        </div>
        <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
          <input className="mdl-textfield__input"  onChange={this.handleInputChange} name="price"  value={desserts.get('price')} type="text"  id="price" placeholder="dish price"/>
        </div>
        <div>
          <a  onClick = {this.removeDessert} type="button" className="pull-right"><i className="material-icons">delete_forever</i></a>
        </div>
      </div>
    );
  }
});

var DessertFormSet = React.createClass({
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
      this.setState({editorClass: "menu-panels col-md-4 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 mdl-shadow--3dp"})
      this.props.saveDessert();
  },

  // handleSubmit: function(e) {
  //   e.preventDefault();
  //   // console.log('business', this.state);
  //   this.props.saveDessert();
  // },

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
      <div className={this.state.editorClass}>
        <div className="header ">
          <div className="mdl-card__title">
            <h5 className="menu-editor-title">Desserts Editor</h5>
          </div>
          <div className="header-buttons mdl-card__actions mdl-card--border">
            {this.state.hideBtn ? <a className="mdl-button mdl-js-button mdl-button--raised pull-left" type="submit" onClick={this.onClick}>Show</a>:null}
            {this.state.showBtn ?<a className="mdl-button mdl-js-button mdl-button--raised pull-left" type="submit" onClick={this.onClickCloseSave}>Hide</a>:null}
            <span className="mdl-chip mdl-chip--contact pull-right ">
                <span className="mdl-chip__contact mdl-color--orange mdl-color-text--white">{this.props.desserts.length}</span>
                <span className="mdl-chip__text">Dessert</span>
            </span>
          </div>
        </div>
        { this.state.showComponent ? <form onSubmit={this.handleSubmit}>
         <div className="form-inLine col-md-12">
           {dessertFormset}
         </div>
         <a  type="button" onClick = {this.props.addDessert} ><i className="material-icons col-md-1 col-md-offset-5">add</i></a>
          {/*<button  onClick={this.handleSubmit}  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"><i className="material-icons">save</i></button>*/}
       </form>:null}
     </div>
    );
  }
});

module.exports = {
  DessertFormSet: DessertFormSet
}
