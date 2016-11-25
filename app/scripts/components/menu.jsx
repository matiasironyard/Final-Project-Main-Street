var React = require('react');
var Backbone = require('backbone');
var RegistrationContainer = require('../components/registration.jsx').RegistrationContainer;
var Dashboard = require('../components/registration.jsx').Dashboard;
var models = require('../models/business');
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
var MenuCollection = require('../models/business.js').MenuCollection;
var Menu = require('../models/business.js').Menu;
var moment = require('moment');



var MenuFormList = React.createClass({
  getInitialState: function(){

    return {
      menu: this.props.menu,
    };
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.menu);
    // this.setState(id, this.props.speical.cid)
  },

  handleInputChange: function(e){
    var target = e.target;
    var newState = {};
    newState[target.name] = target.value;
    this.setState(newState);
    this.props.menu.set(target.name, target.value);
    console.log(target);
  },

  removeMenu: function(e){
    var menu = this.state.menu;
    this.props.removeMenu(menu)
  },

  render: function(){
    var menu = this.state.menu;
    // console.log(special.get('expirydate'))
    return(

      <div className="spcials">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input  onChange={this.handleInputChange} name="name"  value={menu.get('name')} type="text" className="form-control" id="name" placeholder="dish name"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input  id="myContentEditable" onChange={this.handleInputChange} name="description"  value={menu.get('description')} type="text" className="form-control" id="description" placeholder="dish description"/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input  onChange={this.handleInputChange} name="price"  value={menu.get('price')} type="text" className="form-control" id="price" placeholder="dish price"/>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input  onChange={this.handleInputChange} name="category"  value={menu.get('category')} type="category" className="form-control" id="category" placeholder="appetizer, main course, dessert"/>
        </div>
        <div>
          <span type="button" onClick = {this.removeMenu} className = "glyphicon glyphicon-minus"></span>
        </div>
      </div>
    );
  }
});

var MenuForm = React.createClass({
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
  this.props.saveMenu(this.state);
},

removeMenu: function(menu){
    this.props.removeMenu(menu);
},

 render: function(){
   var self = this;
   var business= self.props.business;
   var menuFormset = business.get('menu').map(function(menuItem){
    //  console.log('get specials', business.get('specials'));
     return (
       <div key={menuItem.cid}>
         <MenuFormList menu={menuItem} removeMenu={self.removeMenu}/>
       </div>
     )
   });
   return (
     <div className="col-md-4">
       <form onSubmit={this.handleSubmit}>
         <h3>Menu</h3>
         <div className="form-inLine">
           {menuFormset}
             <div>
               <button type="button" onClick = {this.props.addMenu} className="btn btn-success">Add Another</button>
             </div>
         </div>
        <button type="submit" className="btn btn-success">Save Menu</button>
       </form>
     </div>
   );
 }
});

module.exports = {
  MenuForm: MenuForm
}
