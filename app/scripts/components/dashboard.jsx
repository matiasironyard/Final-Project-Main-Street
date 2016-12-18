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
    var imgUrl = business.get('image_url');
    var divStyle = {
      height: "200",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: 'url(' + imgUrl + ')'
    };
    var imgUpload1 = business.get('image_upload');
    var imgUpload2 = business.get('menu_upload');
    var divImgUpload1 = {
      height: "200",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: 'url(' + imgUpload1 + ')'
    };
    var divImgUpload2 = {
      height: "200",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: 'url(' + imgUpload2 + ')'
    };

    var geolocation = business.get('lat') + ',' + business.get('long');
    var googleMap = 'https://maps.googleapis.com/maps/api/staticmap?center='+ geolocation + '&zoom=16&size=520x230&scale=1 &maptype=roadmap&markers=color:green%7Clabel:%7C' + geolocation + '&key=AIzaSyAf8NIWecbThX7FKm5y5cQlFd5wGeBjhoU';
    return(
      <div className="dashboard-container col-md-11 col-md-offset-1">
        <div className="dashboard-header col-md-4 col-sm-12 col-xs-12 mdl-shadow--8dp">
          <div className="col-md-12" style={divStyle}/>
          <ul className="mdl-list">
            <li className="mdl-list__item name">{business.get('name')}</li>
            <li className="mdl-list__item category">Category:  {business.get('mainCategory')}</li>
            <li className="mdl-list__item rating">Rating:  {business.get('rating')}/5</li>
            <li className="mdl-list__item range">Range:  {business.get('price')}</li>
            <li className="mdl-list__item phone">Phone: {business.get('phone')}</li>
          </ul>
          <div className="mdl-card__actions mdl-card--border">
            <h5>About</h5>
            <p>{business.get('description')}</p>
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a href={link} ><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect pull-left">View Page</button></a>
            <div>
              <a href="#registration/" ><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect pull-right">Edit Info</button></a>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12 uploaded-images">
          <h4 className="well mdl-shadow--2dp mdl-shadow--2dp">Your Images</h4>
          <div className="col-md-6 col-sm-12 col-xs-12">
            <div className="col-md-12" style={divImgUpload1}>
              <i className="material-icons">collections</i>
            </div>
            <span>header image</span>
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12">
            <div className="col-md-12" style={divImgUpload2}>
              <i className="material-icons">collections</i>
            </div>
            <span>about image</span>
          </div>
        </div>

        <div className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12 map">
          <h4 className="well mdl-shadow--2dp">Your Location</h4>
          <div className="location-map col-md-12 col-sm-12 col-xs-12">
            <img className="img-thumbnail pull-left"src={googleMap} height="300"/>
          </div>
          <div className="location-address col-md-12 col-sm-12 col-xs-12">
            <p><i className="material-icons">location_on</i>{business.get('address')}, {business.get('city')}, {business.get('state')}, {business.get('zip')}</p>
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
      <div className="menu-forms specials col-md-8  col-md-offset-2 col-sm-11 col-sm-offset-1 col-xs-11 col-xs-offset-1">
            <h5>Dish: {special.get('name')}</h5>
            <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" onChange={this.handleInputChange} name="name"  value={special.get('name')} type="text"  id="name" placeholder="Dish"/>
            </div>

            <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" id="myContentEditable" onChange={this.handleInputChange} name="description"  value={special.get('description')} type="text"  id="description" placeholder="Description"/>
            </div>

            <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" onChange={this.handleInputChange} name="price"  value={special.get('price')} type="text"  id="price" placeholder="Price"/>
            </div>

            <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" onChange={this.handleInputChange} name="effectivedate"  value={special.get('effectivedate')} type="date"  id="date" placeholder="Start Date"/>
            </div>

            <div className="form-input-div mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" onChange={this.handleInputChange} name="expirydate"  value={special.get('expirydate')} type="date"  id="expiry-date" placeholder="Expiry Date"/>
            </div>

          <div>
        <a  onClick = {this.removeSpecial} type="button" className="pull-right"><i className="material-icons">delete_forever</i></a>
          </div>
      </div>
    );
  }
});

var SpecialsFormSet = React.createClass({
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
    <div className={this.state.editorClass}>
      <div className="header ">
        <div className="mdl-card__title">
          <h5 className="menu-editor-title">Specials Editor</h5>
        </div>
        <div className="header-buttons mdl-card__actions mdl-card--border">
          {this.state.hideBtn ? <a className="mdl-button mdl-js-button mdl-button--raised pull-left" type="submit" onClick={this.onClick}>Show</a>:null}
          {this.state.showBtn ?<a className="mdl-button mdl-js-button mdl-button--raised pull-left" type="submit" onClick={this.onClickCloseSave}>Hide</a>:null}
          <span className="mdl-chip mdl-chip--contact pull-right">
              <span className="mdl-chip__contact mdl-color--orange mdl-color-text--white">{this.props.specials.length}</span>
              <span className="mdl-chip__text">Appetizers</span>
          </span>
        </div>
      </div>

       { this.state.showComponent ? <form onSubmit={this.handleSubmit}>
         <div className="col-md-12 form-inLine">
           {specialsFormset}
         </div>
         <a type="button" onClick = {this.props.addSpecial}><i className="material-icons col-md-1 col-md-offset-5">add</i></a>
       </form>: null}
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
      showComponent: false
    };
  },
  onClick: function() {
  this.setState({ showComponent: true });
  },
  onClickClose: function() {
  this.setState({ showComponent: false });
  },

  componentWillMount: function(){
    var self = this;
    var businessCollection = new BusinessCollection();
    businessCollection.parseWhere('owner', '_User', User.current().get('objectId')).fetch().then(function(){
        self.setState({'business': businessCollection.first()});
    });
  },

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


  render: function(){
    var businessName = this.state.business.get('name');
    var appetizer = this.state.business.get('appetizer');
    var breakfast = this.state.business.get('breakfast');
    var lunch = this.state.business.get('lunch');
    var dinner = this.state.business.get('dinner');
    var dessert = this.state.business.get('dessert');
    var specials = this.state.business.get('specials');
    var menuLength = specials.length + appetizer.length + breakfast.length + lunch.length + dinner.length + dessert.length;

    return(
      <Template>
        <div className="row">
          <div className= "dashboard-windows col-md-12 col-sm-12 col-xs-11">
            <Dashboard  business={this.state.business} />
              <div className="col-md-10 col-md-offset-1 col-sm-11 col-xs-11">
                <div className="row">
                  <h3 className="well mdl-shadow--2dp">Menu Dashboard
                    <span className="mdl-chip mdl-chip--contact pull-right">
                        <span className="mdl-chip__contact mdl-color--orange mdl-color-text--white">{menuLength}</span>
                        <span className="mdl-chip__text">Menu Items</span>
                    </span>
                  </h3>
                </div>
              </div>

                <SpecialsFormSet
                  specials={this.state.business.get('specials')}
                  saveSpecial={this.saveSpecial}
                  removeSpecial={this.removeSpecial}
                  addSpecial={this.addSpecial}
                  />
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
    </Template>
    )
  }
});

module.exports = {
  DashboardContainer: DashboardContainer,
}

// business={this.state.business}
