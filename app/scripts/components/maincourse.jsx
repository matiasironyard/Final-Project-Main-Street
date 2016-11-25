var React = require('react');
var Backbone = require('backbone');
var RegistrationContainer = require('../components/registration.jsx').RegistrationContainer;
var Dashboard = require('../components/registration.jsx').Dashboard;
var models = require('../models/business');
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
var AppetizerCollection = require('../models/business.js').AppetizerCollection;
var Appetizer = require('../models/business.js').Appetizer;
var moment = require('moment');


var MainCourseFormList = React.createClass({
  getInitialState: function(){

    return {
      maincourse: this.props.maincourse,
    };
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.maincourse);
    // this.setState(id, this.props.speical.cid)
  },

  handleInputChange: function(e){
    var target = e.target;
    var newState = {};
    newState[target.name] = target.value;
    this.setState(newState);
    this.props.maincourse.set(target.name, target.value);
    console.log(target);
  },

  removeMainCourse: function(e){
    var maincourse = this.state.maincourse;
    this.props.removeMainCourse(maincourse)
  },

  render: function(){
    var maincourse = this.state.maincourse;
    // console.log(special.get('expirydate'))
    return(
      <div className="appetizers">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input  onChange={this.handleInputChange} name="name"  value={maincourse.get('name')} type="text" className="form-control" id="name" placeholder="dish name"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input  id="myContentEditable" onChange={this.handleInputChange} name="description"  value={maincourse.get('description')} type="text" className="form-control" id="description" placeholder="dish description"/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input  onChange={this.handleInputChange} name="price"  value={maincourse.get('price')} type="text" className="form-control" id="price" placeholder="dish price"/>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input  onChange={this.handleInputChange} name="category"  value={maincourse.get('category')} type="category" className="form-control" id="category" placeholder="appetizer, main course, dessert"/>
        </div>
        <div>
          <span type="button" onClick = {this.removeMainCourse} className = "glyphicon glyphicon-minus"></span>
        </div>
      </div>
    );
  }
});

var MainCourseForm = React.createClass({
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
  this.props.saveMainCourse(this.state);
},

removeMainCourse: function(maincourse){
    this.props.removeMainCourse(maincourse);
},

 render: function(){
   var self = this;
   var business= self.props.business;
   var mainCourseFormset = business.get('maincourse').map(function(maincourseItem){
    //  console.log('get specials', business.get('specials'));
     return (
       <div key={maincourseItem.cid}>
         <MainCourseFormList maincourse={maincourseItem} removeMainCourse={self.removeMainCourse}/>
       </div>
     )
   });
   return (
     <div className="col-md-4">
       <form onSubmit={this.handleSubmit}>
         <h3>Main Course</h3>
         <div className="form-inLine">
           {mainCourseFormset}
             <div>
               <button type="button" onClick = {this.props.addMainCourse} className="btn btn-success">Add Another</button>
             </div>
         </div>
        <button type="submit" className="btn btn-success">Save Main Course</button>
       </form>
     </div>
   );
 }
});

module.exports = {
  MainCourseForm: MainCourseForm
}
