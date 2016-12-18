var React = require('react');
var Backbone = require('backbone');
var RegistrationContainer = require('../components/registration.jsx').RegistrationContainer;
var Dashboard = require('../components/registration.jsx').Dashboard;
var models = require('../models/business');
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
var AppetizerCollection = require('../models/business.js').AppetizerCollection;
var Appetizer = require('../models/business.js').Appetizer;




var LunchForm= React.createClass({
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
    this.props.lunch.set(target.name, target.value);
    this.forceUpdate();
    console.log(target);
  },

  removeLunch: function(e){
    var lunch = this.props.lunch;
    this.props.removeLunch(lunch)
  },

  render: function(){
    var lunch = this.props.lunch;
    // console.log(special.get('expirydate'))
    return(
      <div className="menu-forms appetizers col-md-8  col-md-offset-2 col-sm-11 col-sm-offset-1 col-xs-11 col-xs-offset-1">
        <h5>Dish: {lunch.get('name')}</h5>
        <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
          <input className="mdl-textfield__input"  onChange={this.handleInputChange} name="name"  value={lunch.get('name')} type="text"  id="name" placeholder="dish name"/>
          </div>
          <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input"  id="myContentEditable" onChange={this.handleInputChange} name="description"  value={lunch.get('description')} type="text"  id="description" placeholder="dish description"/>
          </div>
          <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input"  onChange={this.handleInputChange} name="price"  value={lunch.get('price')} type="text"  id="price" placeholder="dish price"/>
      </div>
        <div>
          <a  onClick = {this.removeLunch} type="button" className="pull-right"><i className="material-icons">delete_forever</i></a>
        </div>
      </div>
    );
  }
});

var LunchFormSet = React.createClass({
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
      this.props.saveLunch();
  },

//   handleSubmit: function(e){
//   e.preventDefault();
//   // console.log('business', this.state);
//   this.props.saveLunch();
// },

removeLunch: function(lunch){
    this.props.removeLunch(lunch);
},

 render: function(){
   var self = this;
  //  var business= self.props.business;
   var lunchFormset = this.props.lunch.map(function(lunchItem){
    //  console.log('get specials', business.get('specials'));
    console.log('lunch', self.props.lunch);

     return (
       <div key={lunchItem.cid}>
         <LunchForm lunch={lunchItem} removeLunch={self.removeLunch}/>
       </div>
     )
   });
   return (
     <div className={this.state.editorClass}>
       <div className="header ">
         <div className="mdl-card__title">
           <h5 className="menu-editor-title">Lunch Editor</h5>
         </div>
         <div className="header-buttons mdl-card__actions mdl-card--border">
           {this.state.hideBtn ? <a className="mdl-button mdl-js-button mdl-button--raised pull-left" type="submit" onClick={this.onClick}>Show</a>:null}
           {this.state.showBtn ?<a className="mdl-button mdl-js-button mdl-button--raised pull-left" type="submit" onClick={this.onClickCloseSave}>Hide</a>:null}
           <span className="mdl-chip mdl-chip--contact pull-right ">

               <span className="mdl-chip__contact mdl-color--orange mdl-color-text--white">{this.props.lunch.length}</span>
               <span className="mdl-chip__text">Lunch</span>
           </span>
         </div>
       </div>
        { this.state.showComponent ? <form onSubmit={this.handleSubmit}>
         <div className="form-inLine col-md-12">
           {lunchFormset}
         </div>
         <a  type="button" onClick = {this.props.addLunch} ><i className="material-icons col-md-1 col-md-offset-5">add</i></a>
        {/*<button  onClick={this.handleSubmit}  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"><i className="material-icons">save</i></button>*/}
       </form>:null}
     </div>
   );
 }
});

module.exports = {
  LunchFormSet: LunchFormSet
}
