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
var MainCourse = require('../models/business.js').MainCourse;
var MainCourseCollection = require('../models/business.js').MainCourseCollection;
var Dessert = require('../models/business.js').Dessert;
var DessertCollection = require('../models/business.js').DessertCollection;
var moment = require('moment');
var AppetizerForm = require('../components/appetizer.jsx').AppetizerForm;
var MainCourseForm = require('../components/maincourse.jsx').MainCourseForm;
var DessertForm = require('../components/dessert.jsx').DessertForm;
var Form = require('muicss/lib/react/form');
var Input = require('muicss/lib/react/input');
var Button = require('muicss/lib/react/button');


var Dashboard = React.createClass({
  getInitialState: function(){
    return this.props.business.toJSON();
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.business.toJSON());
  },

  render: function(){
    var business = this.props.business;
    var geolocation = business.get('lat') + ',' + business.get('long');
    var googleMap = 'https://maps.googleapis.com/maps/api/staticmap?center='+ geolocation + '&zoom=16&size=250x150&scale=1 &maptype=roadmap&markers=color:green%7Clabel:%7C' + geolocation + '&key=AIzaSyAf8NIWecbThX7FKm5y5cQlFd5wGeBjhoU';
    return(
      <div className="dashboard-container col-md-12">
        <div className="dashboard-header col-md-3">
          <img className="img-thumbnail" src={business.get('image_url')}/>
          <ul>
            <li>{business.get('name')}</li>
            <li><img src={business.get('rating_img_url')}/></li>
            <li>{business.get('mainCategory')}</li>
            <li>{business.get('subCategory')}</li>
            <li>{business.get('is_closed')}</li>
            <li>{business.get('phone')}</li>
          </ul>
        </div>
        <div className="col-md-3 map">
          <h3>Location</h3>
          <img className="img-thumbnail"src={googleMap}/>
          <p>{business.get('address')}</p>
          <p>{business.get('city')}, {business.get('state')}, {business.get('zip')}</p>
        </div>
        <div className="col-md-3 dashboard-review">
          <h3>Recent Review</h3>
            <img className="img-thumbnail" src={business.get('snippet_image_url')}/>
            <p>{business.get('snippet_text')}</p>
        </div>
        <div className="col-md-3 uploaded-images">
          <h3>Uploaded Image</h3>
          <img className="img-thumbnail" width="200px" src={business.get('image_upload')}/>
        </div>
      </div>
    )
  }
});

var SpecialsFormList = React.createClass({
  getInitialState: function(){
    return {
      special: this.props.special,
    };
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.special);
    // this.setState(id, this.props.speical.cid)
  },

  handleInputChange: function(e){
    var target = e.target;
    var newState = {};
    newState[target.name] = target.value;
    this.setState(newState);
    this.props.special.set(target.name, target.value);
    console.log(target);
  },

  removeSpecial: function(e){
    var special = this.state.special;
    this.props.removeSpecial(special)
  },

  render: function(){
    var special = this.state.special;
    // console.log(special.get('expirydate'))
    var expiryDate = special.get('expirydate');
     var now = moment();
     var formatedDate = now.format("YYYY-MM-DD");
     if(formatedDate == expiryDate){
       this.removeSpecial(special);
       console.warn(this.removeSpecial());
     };

    return(
      <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Input  onChange={this.handleInputChange} name="name"  value={special.get('name')} type="text"  id="name" placeholder="special of the day"/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Input  id="myContentEditable" onChange={this.handleInputChange} name="description"  value={special.get('description')} type="text"  id="description" placeholder="special of the day"/>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <Input  onChange={this.handleInputChange} name="price"  value={special.get('price')} type="text"  id="price" placeholder="special of the day"/>
          </div>
          <div className="form-group">
            <label htmlFor="test">Effective Date</label>
            <Input  onChange={this.handleInputChange} name="effectivedate"  value={special.get('effectivedate')} type="date"  id="date" placeholder="special of the day"/>
          </div>
          <div className="form-group">
            <label htmlFor="test">Expires On</label>
            <p>(Automatically deletes)</p>
            <Input  onChange={this.handleInputChange} name="expirydate"  value={special.get('expirydate')} type="date"  id="expiry-date" placeholder="special of the day"/>
          </div>
          <div>
            <Button variant="raised"  onClick = {this.removeSpecial} type="button" className="btn btn-danger pull-right">Delete</Button>
          </div>
      </div>
    );
  }
});

var SpecialsForm = React.createClass({
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
  this.props.saveSpecial(this.state);
},
removeSpecial: function(special){
    this.props.removeSpecial(special);
},
 render: function(){
   var self = this;
   var business= self.props.business;
   var specialsFormset = business.get('specials').map(function(special){
    //  console.log('get specials', business.get('specials'));
     return (
       <div key={special.cid}>
         <SpecialsFormList special={special} removeSpecial={self.removeSpecial}/>
       </div>
     )
   });
   return (
     <div className="col-md-12">
       <Form>
       <form onSubmit={this.handleSubmit}>
         <h3>Specials</h3>
         <div className="col-md-12 form-inLine">
           {specialsFormset}
           <Button variant="raised"  type="button" onClick = {this.props.addSpecial} className="btn btn-success">Add Another</Button>
         </div>
         <br></br>
        <Button variant="raised"  type="submit" className="btn btn-success">Save Specials</Button>
       </form>
       </Form>
     </div>
   );
 }
});

var DashboardContainer = React.createClass({
  getInitialState: function(){
    return {
      business: new models.Business(),
    };
  },

  componentWillMount: function(){
    var self = this;
    var businessCollection = new BusinessCollection();
    businessCollection.parseWhere('owner', '_User', User.current().get('objectId')).fetch().then(function(){
        self.setState({'business': businessCollection.first()});
    });
  },

  componentWillReceiveProps: function(){
    this.getBusiness();
  },
  getBusiness: function(){
    var business = this.state.business;
    var businessId = this.props.businessId;
    if(!businessId){
      return;
    }
    business.set('objectId', businessId);
    business.fetch().then(()=> {
      this.setState({business: business});
    });
  },

  addSpecial: function(){
    var business = this.state.business;
    var specials = business.get('specials');
    var special = new Special();
    specials.add([{}]);
    this.setState({business: business})
  },
  removeSpecial: function(special){
    var business = this.state.business;
    var specialsCollection = business.get('specials');
    specialsCollection.remove(special.cid);
    // business.save();
    this.setState({business: business});
  },

  saveSpecial: function(specialData){
    var business = this.state.business;
    business.set(specialData);
    business.saveSpecial();
  },

  addAppetizer: function(){
    var business = this.state.business;
    var appetizers = business.get('appetizer');
    var appetizer = new Appetizer();
    appetizers.add([{}]);
    this.setState({business: business})
    console.log(this.state);
  },

  removeAppetizer: function(appetizer){
    var business = this.state.business;
    var appetizerCollection = business.get('appetizer');
    appetizerCollection.remove(appetizer.cid);
    // business.save();
    this.setState({business: business});
  },

  saveAppetizer: function(appetizerData){
    var business = this.state.business;
    business.set(appetizerData);
    business.saveAppetizer();
  },

  addMainCourse: function(){
    var business = this.state.business;
    var mainCourses= business.get('maincourse');
    var mainCourse = new MainCourse();
    mainCourses.add([{}]);
    this.setState({business: business})
  },

  removeMainCourse: function(maincourse){
    var business = this.state.business;
    var mainCourseCollection = business.get('maincourse');
    mainCourseCollection.remove(maincourse.cid);
    // business.save();
    this.setState({business: business});
  },

  saveMainCourse: function(mainCourseData){
    var business = this.state.business;
    business.set(mainCourseData);
    business.saveMainCourse();
  },

  addDessert: function(){
    var business = this.state.business;
    var desserts = business.get('dessert');
    var dessert = new Dessert();
    desserts.add([{}]);
    this.setState({business: business})
  },

  removeDessert: function(dessert){
    var business = this.state.business;
    var dessertCollection = business.get('dessert');
    dessertCollection.remove(dessert.cid);
    // business.save();
    this.setState({business: business});
  },

  saveDessert: function(dessertData){
    var business = this.state.business;
    business.set(dessertData);
    business.saveDessert();
  },

  handleToggleSpecials: function(e){
  e.preventDefault();
  var showSpecials = !this.state.showSpecials;
  this.setState({showSpecials: showSpecials});
  },

  handleToggleMenu: function(e){
  e.preventDefault();
  var showMenu = !this.state.showMenu;
  this.setState({showMenu: showMenu});
  },

  render: function(){
    var businessName = this.state.business.get('name');
    console.log(businessName);
    var appetizer = this.state.business.get('appetizer');
    console.log(appetizer);
    var maincourse = this.state.business.get('maincourse');
    var dessert = this.state.business.get('dessert');
    var openSpecialMessage = this.state.showSpecials  ? !this.state.showSpecials : "Open Editor";
    var closeSpecialMessage = !this.state.showSpecials  ? this.state.showSpecials : "Close Editor";
    var openMenuMessage = this.state.showMenu  ? !this.state.showMenu : "Open Editor";
    var closeMenuMessage = !this.state.showMenu  ? this.state.showMenu : "Close Editor";

    return(
      <div className="col-md-12">
        <h1 className="well"> {businessName} Dashboard</h1>
        <Dashboard  business={this.state.business} />
        <div className="specials-pane">
          <h2>Specials Dashboard</h2>
          <Button variant="raised"  type="button" className="btn btn-default btn-lg btn-block" onClick={this.handleToggleSpecials}>{openSpecialMessage} {closeSpecialMessage}</Button>
            {this.state.showSpecials ?<SpecialsForm  business={this.state.business} saveSpecial={this.saveSpecial} specials={this.state.business.get('specials')}  removeSpecial={this.removeSpecial} addSpecial={this.addSpecial}/>: null}
        </div>
        <div className="menu-pane">
          <h2>Menu Dashboard</h2>
          <Button variant="raised"  onClick={this.handleToggleMenu} type="button" className="btn btn-default btn-lg btn-block">{openMenuMessage} {closeMenuMessage}</Button>
          {this.state.showMenu ? <div className="menu-creator">
            <AppetizerForm   business={this.state.business} saveAppetizer={this.saveAppetizer} appetizer={this.state.business.get('appetizer')} removeAppetizer={this.removeAppetizer} addAppetizer={this.addAppetizer}/>
            <MainCourseForm   business={this.state.business} saveMainCourse={this.saveMainCourse} maincourse={this.state.business.get('maincourse')} removeMainCourse={this.removeMainCourse} addMainCourse={this.addMainCourse}/>
            <DessertForm  business={this.state.business} saveDessert={this.saveDessert} dessert={this.state.business.get('dessert')} removeDessert={this.removeDessert} addDessert={this.addDessert}/>
          </div>: null}
        </div>
      </div>
    )
  }
});

module.exports = {
  DashboardContainer: DashboardContainer,
}
