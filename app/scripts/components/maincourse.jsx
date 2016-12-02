var React = require('react');
var Backbone = require('backbone');
var RegistrationContainer = require('../components/registration.jsx').RegistrationContainer;
var Dashboard = require('../components/registration.jsx').Dashboard;
var models = require('../models/business');
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
var AppetizerCollection = require('../models/business.js').AppetizerCollection;
var Appetizer = require('../models/business.js').Appetizer;




var MainCourseForm= React.createClass({
  // getInitialState: function(){
  //
  //   return {
  //     maincourse: this.props.maincourse,
  //   };
  // },
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
    this.props.maincourse.set(target.name, target.value);
    this.forceUpdate();
    console.log(target);
  },

  removeMainCourse: function(e){
    var maincourse = this.props.maincourse;
    this.props.removeMainCourse(maincourse)
  },

  render: function(){
    var maincourse = this.props.maincourse;
    // console.log(special.get('expirydate'))
    return(
      <div className="menu-forms maincourse">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className="form-control"  onChange={this.handleInputChange} name="name"  value={maincourse.get('name')} type="text"  id="name" placeholder="dish name"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input className="form-control"  id="myContentEditable" onChange={this.handleInputChange} name="description"  value={maincourse.get('description')} type="text"  id="description" placeholder="dish description"/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input className="form-control"  onChange={this.handleInputChange} name="price"  value={maincourse.get('price')} type="text"  id="price" placeholder="dish price"/>
        </div>
        <div>
          <button  onClick = {this.removeMainCourse} type="button"className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect pull-right">Delete</button>
        </div>
      </div>
    );
  }
});

var MainCourseFormSet = React.createClass({
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
  this.props.saveMainCourse();
},

removeMainCourse: function(maincourse){
    this.props.removeMainCourse(maincourse);
},

 render: function(){
   var self = this;
  //  var business= self.props.business;
   var mainCourseFormset = this.props.maincourse.map(function(maincourseItem){
    //  console.log('get specials', business.get('specials'));
     return (
       <div key={maincourseItem.cid}>
         <MainCourseForm maincourse={maincourseItem} removeMainCourse={self.removeMainCourse}/>
       </div>
     )
   });
   return (
     <div className="menu-panels col-md-4">
       <form onSubmit={this.handleSubmit}>
         <h3>Main Course</h3>
         <div className="form-inLine">
           {mainCourseFormset}
          <button  type="button" onClick = {this.props.addMainCourse} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Add Another</button>
         </div>
         <br></br>
        <button  onClick={this.handleSubmit} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Save Main Course</button>
       </form>
     </div>
   );
 }
});

module.exports = {
  MainCourseFormSet: MainCourseFormSet
}
