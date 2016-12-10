var React = require('react');
var Backbone = require('backbone');
var RegistrationContainer = require('../components/registration.jsx').RegistrationContainer;
var Dashboard = require('../components/registration.jsx').Dashboard;
var models = require('../models/business');
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
var SpecialCollection = require('../models/business.js').SpecialCollection;
var Special = require('../models/business.js').Special;
var Appetizer = require('../models/business.js').Appetizer;
var AppetizerCollection = require('../models/business.js').AppetizerCollection;
var Breakfast = require('../models/business.js').Breakfast;
var BreakfastCollection = require('../models/business.js').BreakfastCollection;
var Lunch = require('../models/business.js').Lunch;
var LunchCollection = require('../models/business.js').LunchCollection;
var Dinner = require('../models/business.js').Dinner;
var DinnerCollection = require('../models/business.js').DinnerCollection;
var Dessert = require('../models/business.js').Dessert;
var DessertCollection = require('../models/business.js').DessertCollection;
var Template = require('../templates/templates.jsx');
var moment = require('moment');
var AppetizerFormSet= require('../components/appetizer.jsx').AppetizerFormSet;
var BreakfastFormSet = require('../components/breakfast.jsx').BreakfastFormSet;
var LunchFormSet = require('../components/lunch.jsx').LunchFormSet;
var DinnerFormSet = require('../components/dinner.jsx').DinnerFormSet;
var DessertFormSet = require('../components/dessert.jsx').DessertFormSet;
var Modal = require('react-modal');

/**************************************************************************************
DASHBAORD COMPONENT
**************************************************************************************/

var Dashboard = React.createClass({
  getInitialState: function(){
    return this.props.business.toJSON();
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.business.toJSON());
  },

  render: function(){
    var business = this.props.business;
    console.log(business);
    var objectId = this.props.business.get('objectId');
    var link = '#restaurants/' + objectId + '/';
    var geolocation = business.get('lat') + ',' + business.get('long');
    var googleMap = 'https://maps.googleapis.com/maps/api/staticmap?center='+ geolocation + '&zoom=16&size=250x150&scale=1 &maptype=roadmap&markers=color:green%7Clabel:%7C' + geolocation + '&key=AIzaSyAf8NIWecbThX7FKm5y5cQlFd5wGeBjhoU';
    return(
      <div className="dashboard-container col-md-12">
        <div className="dashboard-header col-md-4 mdl-card mdl-shadow--2dp">
          <img className="img-thumbnail" src={business.get('image_url')} width="150"/>
          <ul className="mdl-list">
            <li className="mdl-list__item"><h5>{business.get('name')}</h5></li>
            <li className="mdl-list__item">Category:  {business.get('mainCategory')}</li>
            <li className="mdl-list__item">Rating:  {business.get('rating')}/5</li>
            <li className="mdl-list__item">Range:  {business.get('price')}</li>
            <li className="mdl-list__item">Phone: {business.get('phone')}</li>
          </ul>
          <div className="mdl-card__actions mdl-card--border">
            <a href={link} ><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect pull-left">View Page</button></a>
            <div>
              <a href="#registration/" ><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect pull-right">Edit Info</button></a>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-md-offset-1 uploaded-images">
          <h4 className="well">Uploaded Images</h4>
          <div className="col-md-6">
            <img className="img-thumbnail" width="150px" src={business.get('image_upload')}/>
            <p>Header image</p>
          </div>
          <div className="col-md-6">
            <img className="img-thumbnail" width="150px" src={business.get('menu_upload')}/>
            <p>About image</p>
          </div>
        </div>

        <div className="col-md-6 col-md-offset-1 map">
          <h4 className="well">Location</h4>
          <div className="location-map col-md-6">
            <img className="img-thumbnail pull-left"src={googleMap}/>
          </div>
          <div className="location-address col-md-6">
            <h5>Address</h5>
            <p>{business.get('address')}</p>
            <p>{business.get('city')}, {business.get('state')}, {business.get('zip')}</p>
          </div>
        </div>

      </div>
    )
  }
});

/**************************************************************************************
SPECIALS COMPONENTS
**************************************************************************************/

var SpecialsForm = React.createClass({
  // getInitialState: function(){
  //   return {
  //     special: this.props.special,
  //   };
  // },

  // componentWillReceiveProps: function(newProps){
  //   this.setState(newProps.special);
  //   // this.setState(id, this.props.speical.cid)
  // },

  handleInputChange: function(e){
    var target = e.target;
    // var newState = {};
    // newState[target.name] = target.value;
    // this.setState(newState);
    this.props.special.set(target.name, target.value);
    this.forceUpdate();
  },

  removeSpecial: function(e){
    var special = this.props.special;
    this.props.removeSpecial(special);
  },

  render: function(){
    var special = this.props.special;
    // console.log(special.get('expirydate'))
    var expiryDate = special.get('expirydate');
     var now = moment();
     var formatedDate = now.format("YYYY-MM-DD");
     if(formatedDate == expiryDate){
       this.removeSpecial(special);
      //  console.warn(this.removeSpecial());
     };

    return(
      <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control" onChange={this.handleInputChange} name="name"  value={special.get('name')} type="text"  id="name" placeholder="special of the day"/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input className="form-control" id="myContentEditable" onChange={this.handleInputChange} name="description"  value={special.get('description')} type="text"  id="description" placeholder="special of the day"/>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input className="form-control" onChange={this.handleInputChange} name="price"  value={special.get('price')} type="text"  id="price" placeholder="special of the day"/>
          </div>
          <div className="form-group">
            <label htmlFor="test">Effective Date</label>
            <p></p>
            <input className="form-control" onChange={this.handleInputChange} name="effectivedate"  value={special.get('effectivedate')} type="date"  id="date" placeholder="special of the day"/>
          </div>
          <div className="form-group">
            <label htmlFor="test">Expires On</label>
            <p>(Automatically deletes)</p>
            <input className="form-control" onChange={this.handleInputChange} name="expirydate"  value={special.get('expirydate')} type="date"  id="expiry-date" placeholder="special of the day"/>
          </div>
          <div>
            <button type="button" onClick = {this.removeSpecial} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect pull-right"><i className="material-icons">delete_forever</i></button>
          </div>
      </div>
    );
  }
});

var SpecialsFormSet = React.createClass({
  // getInitialState: function(){
  //   return this.props.business.toJSON();
  // },
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
  this.props.saveSpecial();
  },
  removeSpecial: function(special){
      this.props.removeSpecial(special);
  },
 render: function(){
   var self = this;
  //  var business= self.props.business;
   var specialsFormset = this.props.specials.map(function(special){
    //  console.log('get specials', business.get('specials'));
     return (
       <div key={special.cid}>
         <SpecialsForm special={special} removeSpecial={self.removeSpecial}/>
       </div>
     )
   });
   return (
     <div className="col-md-12 dashboard-specials">
       <form onSubmit={this.handleSubmit}>
         <h3>Specials</h3>
         <div className="col-md-12 form-inLine">
           {specialsFormset}
         </div>
         <button type="button" onClick = {self.props.addSpecial} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect"><i className="material-icons">add</i></button>
         <button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"><i className="material-icons">save</i></button>
       </form>
     </div>
   );
 }
});

/**************************************************************************************
PARENT CONTAINER
**************************************************************************************/

var DashboardContainer = React.createClass({
  getInitialState: function(){
    return {
      business: new models.Business(),
      // modalIsOpen: false,
    };
  },

  componentWillMount: function(){
    var self = this;
    var businessCollection = new BusinessCollection();
    businessCollection.parseWhere('owner', '_User', User.current().get('objectId')).fetch().then(function(){
        self.setState({'business': businessCollection.first()});
    });
  },

  // componentWillReceiveProps: function(){
  //   this.getBusiness();
  // },
  // getBusiness: function(){
  //   var business = this.state.business;
  //   var businessId = this.props.businessId;
  //   if(!businessId){
  //     return;
  //   }
  //   business.set('objectId', businessId);
  //   business.fetch().then(()=> {
  //     this.setState({business: business});
  //   });
  //
  // },

//ADD FUNCTIONS
  addSpecial: function(){
    var business = this.state.business;
    var specials = business.get('specials');
    // var special = new Special();
    specials.add([{}]);
    this.setState({business: business})
  },

  addAppetizer: function(){
    var business = this.state.business;
    var appetizers = business.get('appetizer');
    // var appetizer = new Appetizer();
    appetizers.add([{}]);
    this.setState({business: business})
  },
  addBreakfast: function(){
    var business = this.state.business;
    var addBreakfast= business.get('breakfast');
    // var mainCourse = new MainCourse();
    addBreakfast.add([{}]);
    this.setState({business: business})
  },
  addLunch: function(){
    var business = this.state.business;
    var addLunch= business.get('lunch');
    // var mainCourse = new MainCourse();
    addLunch.add([{}]);
    this.setState({business: business})
  },
  addDinner: function(){
    var business = this.state.business;
    var addDinner= business.get('dinner');
    // var mainCourse = new MainCourse();
    addDinner.add([{}]);
    this.setState({business: business})
  },

  addDessert: function(){
    var business = this.state.business;
    var desserts = business.get('dessert');
    // var dessert = new Dessert();
    desserts.add([{}]);
    this.setState({business: business})
  },
  //REMOVE FUNCTIONS
  removeSpecial: function(special){
    var business = this.state.business;
    var specialsCollection = business.get('specials');
    specialsCollection.remove(special);
    business.save().then(() => {
      this.setState({business: business});
    });
  },
  removeAppetizer: function(appetizer){
    var business = this.state.business;
    var appetizerCollection = business.get('appetizer');
    appetizerCollection.remove(appetizer);
    business.save().then(()=>{
      this.setState({business: business});
    });
  },
  removeBreakfast: function(breakfast){
    var business = this.state.business;
    var breakfastCollection = business.get('breakfast');
    breakfastCollection.remove(breakfast);
    business.save().then(()=>{
      this.setState({business: business});
    });
  },
  removeLunch: function(lunch){
    var business = this.state.business;
    var lunchCollection = business.get('lunch');
    lunchCollection.remove(lunch);
    business.save().then(()=>{
      this.setState({business: business});
    });
  },
  removeDinner: function(dinner){
    var business = this.state.business;
    var dinnerCollection = business.get('dinner');
    dinnerCollection.remove(dinner);
    business.save().then(()=>{
      this.setState({business: business});
    });
  },
  removeDessert: function(dessert){
    var business = this.state.business;
    var dessertCollection = business.get('dessert');
    dessertCollection.remove(dessert);
    business.save().then(()=>{
      this.setState({business: business});
    });
  },
  //SAVE FUNCTIONS
  saveSpecial: function(){
    var business = this.state.business;
    business.save();
  },
  saveAppetizer: function(appetizerData){
    var business = this.state.business;
    // business.set(appetizerData);
    business.save();
  },
  saveBreakfast: function(breakfastData){
    var business = this.state.business;
    // business.set(mainCourseData);
    business.save();
  },
  saveLunch: function(lunchData){
    var business = this.state.business;
    // business.set(mainCourseData);
    business.save();
  },
  saveDinner: function(lunchData){
    var business = this.state.business;
    // business.set(mainCourseData);
    business.save();
  },
  saveDessert: function(dessertData){
    var business = this.state.business;
    // business.set(dessertData);
    // business.saveDessert();
    business.save();
  },

  // handleToggleSpecials: function(e){
  // e.preventDefault();
  // var showSpecials = !this.state.showSpecials;
  // this.setState({showSpecials: showSpecials});
  // },
  //
  // handleToggleMenu: function(e){
  // e.preventDefault();
  // var showMenu = !this.state.showMenu;
  // this.setState({showMenu: showMenu});
  // },
  //
  // openModal: function() {
  //   this.setState({modalIsOpen: true});
  // },
  //
  // closeModal: function() {
  //   this.setState({modalIsOpen: false});
  // },

  render: function(){
    var businessName = this.state.business.get('name');
    console.log(businessName);
    var appetizer = this.state.business.get('appetizer');
    console.log(appetizer);
    var breakfast = this.state.business.get('breakfast');
    var lunch = this.state.business.get('lunch');
    var dinner = this.state.business.get('dinner');
    var dessert = this.state.business.get('dessert');
    var openSpecialMessage = this.state.showSpecials  ?  !this.state.showSpecials : "Open Editor";
    var closeSpecialMessage = !this.state.showSpecials  ? this.state.showSpecials : "Close Editor";
    var openMenuMessage = this.state.showMenu  ? !this.state.showMenu : "Open Editor";
    var closeMenuMessage = !this.state.showMenu  ? this.state.showMenu : "Close Editor";

    return(
      <Template>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-11">
            <div className= "dashboard-windows col-md-12 col-sm-12 col-xs-11">
              <h1 className="well"> {businessName} Dashboard</h1>
              <Dashboard  business={this.state.business} />
                <div className="specials-pane">
                  <SpecialsFormSet
                    specials={this.state.business.get('specials')}
                    saveSpecial={this.saveSpecial}
                    removeSpecial={this.removeSpecial}
                    addSpecial={this.addSpecial}
                    />
                </div>

                <h1>Menu Dashboard</h1>
                    <AppetizerFormSet className="menu-creator-panels"
                    appetizers={this.state.business.get('appetizer')}
                    saveAppetizer={this.saveAppetizer}
                    removeAppetizer={this.removeAppetizer}
                    addAppetizer={this.addAppetizer}
                    />
                  <BreakfastFormSet className="menu-creator-panels"
                    breakfast={this.state.business.get('breakfast')} saveBreakfast={this.saveBreakfast}  removeBreakfast={this.removeBreakfast}
                    addBreakfast={this.addBreakfast}
                    />
                  <LunchFormSet className="menu-creator-panels"
                      lunch={this.state.business.get('lunch')} saveLunch={this.saveLunch}  removeLunch={this.removeLunch}
                      addLunch={this.addLunch}
                      />
                    <DinnerFormSet className="menu-creator-panels"
                    dinner={this.state.business.get('dinner')} saveDinner={this.saveDinner}  removeDinner={this.removeDinner}
                    addDinner={this.addDinner}
                    />
                    <DessertFormSet className="menu-creator-panels"
                      desserts={this.state.business.get('dessert')}
                      saveDessert={this.saveDessert}
                      removeDessert={this.removeDessert}
                      addDessert={this.addDessert}
                      />
              </div>
        </div>
      </div>
    </Template>
    )
  }
});

module.exports = {
  DashboardContainer: DashboardContainer,
}

// business={this.state.business}
