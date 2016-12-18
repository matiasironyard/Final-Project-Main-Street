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
      <div className="menu-forms appetizers col-md-8  col-md-offset-2 col-sm-11 col-sm-offset-1 col-xs-11 col-xs-offset-1">
        <h5>Dish: {dinner.get('name')}</h5>
        <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
          <input className="mdl-textfield__input"  onChange={this.handleInputChange} name="name"  value={dinner.get('name')} type="text"  id="name" placeholder="dish name"/>
          </div>
          <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input"  id="myContentEditable" onChange={this.handleInputChange} name="description"  value={dinner.get('description')} type="text"  id="description" placeholder="dish description"/>
          </div>
          <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
            <input className="mdl-textfield__input"  onChange={this.handleInputChange} name="price"  value={dinner.get('price')} type="text"  id="price" placeholder="dish price"/>
      </div>
        <div>
          <a  onClick = {this.removeDinner} type="button" className="pull-right"><i className="material-icons">delete_forever</i></a>
        </div>
      </div>
    );
  }
});

var DinnerFormSet = React.createClass({
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
      this.setState({editorClass: "menu-panels col-md-4 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 mdl-shadow--3dp"})
      this.props.saveAppetizer();
  },

//   handleSubmit: function(e){
//   e.preventDefault();
//   // console.log('business', this.state);
//   this.props.saveDinner();
// },

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
     <div className={this.state.editorClass}>
       <div className="header ">
         <div className="mdl-card__title">
           <h5 className="menu-editor-title">Dinner Editor</h5>
         </div>
         <div className="header-buttons mdl-card__actions mdl-card--border">
           {this.state.hideBtn ? <a className="mdl-button mdl-js-button mdl-button--raised pull-left" type="submit" onClick={this.onClick}>Show</a>:null}
           {this.state.showBtn ?<a className="mdl-button mdl-js-button mdl-button--raised pull-left" type="submit" onClick={this.onClickCloseSave}>Hide</a>:null}
           <span className="mdl-chip mdl-chip--contact pull-right ">

               <span className="mdl-chip__contact mdl-color--orange mdl-color-text--white">{this.props.dinner.length}</span>
               <span className="mdl-chip__text">Dinner</span>
           </span>
         </div>
       </div>
       { this.state.showComponent ? <form onSubmit={this.handleSubmit}>
         <div className="form-inLine col-md-12">
           {dinnerFormset}
         </div>
         <a  type="button" onClick = {this.props.addDinner} ><i className="material-icons col-md-1 col-md-offset-5">add</i></a>

        {/*<button  onClick={this.handleSubmit}  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"><i className="material-icons">save</i></button>*/}
       </form>:null}
     </div>
   );
 }
});

module.exports = {
  DinnerFormSet: DinnerFormSet
}
