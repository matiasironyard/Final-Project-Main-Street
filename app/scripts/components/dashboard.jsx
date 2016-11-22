var React = require('react');
var Backbone = require('backbone');
var RegistrationContainer = require('../components/registration.jsx').RegistrationContainer;
var Dashboard = require('../components/registration.jsx').Dashboard;
var models = require('../models/business');
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;
var SpecialCollection = require('../models/business.js').SpecialCollection;
var Special = require('../models/business.js').Special;
var React = require('react');


var Dashboard = React.createClass({
  getInitialState: function(){
    return this.props.business.toJSON();
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.business.toJSON());
  },

  render: function(){
    var business = this.props.business;
    // console.log('bizz data', business);
    var geolocation = business.get('lat') + ',' + business.get('long');
    var googleMap = 'https://maps.googleapis.com/maps/api/staticmap?center='+ geolocation + '&zoom=16&size=250x150&scale=1 &maptype=roadmap&markers=color:green%7Clabel:%7C' + geolocation + '&key=AIzaSyAf8NIWecbThX7FKm5y5cQlFd5wGeBjhoU';
    // console.log(googleMap);
    // console.log(geolocation);
    return(
      <div className="dashboard-container col-md-5 col-md-offset-1">
        <h1>Business Dashboard</h1>
        <img src={business.get('image_url')}/>
          <ul>
            <li>{business.get('name')}</li>
            <li><img src={business.get('rating_img_url')}/></li>
            <li>{business.get('mainCategory')}</li>
            <li>{business.get('subCategory')}</li>
            <li>{business.get('is_closed')}</li>
            <li>{business.get('phone')}</li>
            <li>{business.get('address')}, {business.get('city')}, {business.get('state')}, {business.get('zip')}</li><br/>
          </ul>
          <div className="dashboard-review">
            <h4>Recent Review</h4>
            <ul>
              <li><img src={business.get('snippet_image_url')}/><p>{business.get('snippet_text')}</p></li>
            </ul>
          </div>
          <div className="map">
            <img src={googleMap}/>
          </div>
          <div className="uploaded-images">
            <h4>Uploaded Files</h4>
            <h6>Uploaded Images</h6>
            <img width="200px" src={business.get('image_upload')}/>
            <h6>Uploaded Menues</h6>
            <p>menu link</p>
          </div>

      </div>
    )
  }
});

var SpecialsFormList = React.createClass({
  getInitialState: function(){

    return {
      special: this.props.special
    };
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.special);
    // this.setState(id, this.props.speical.cid)
  },

  handleInputChange: function(e){
    var target = e.target;
    // console.log('target', target);
    var newState = {};
    newState[target.name] = target.value;
    this.setState(newState);
    this.props.special.set(target.name, target.value);
  },

  removeSpecial: function(e){
    var special = this.state.special;
    console.log(this.state);
    // var myObj = this.props.special.toJSON();
    this.props.removeSpecial(special)
  },


  render: function(){
    var special = this.state.special;
    console.log(special.get('effectivedate'))
    return(
      <div className="spcials col-md-12">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input  onChange={this.handleInputChange} name="name"  value={special.get('name')} type="text" className="form-control" id="name" placeholder="special of the day"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input  onChange={this.handleInputChange} name="description"  value={special.get('description')} type="text" className="form-control" id="description" placeholder="special of the day"/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input  onChange={this.handleInputChange} name="price"  value={special.get('price')} type="text" className="form-control" id="price" placeholder="special of the day"/>
        </div>
        <div className="form-group">
          <label htmlFor="test">Effective Date</label>
          <input  onChange={this.handleInputChange} name="effectivedate"  value={special.get('effectivedate')} type="date" className="form-control" id="date" placeholder="special of the day"/>
          <p>Currently set to: {special.get('effectivedate')}</p>
        </div>
        <div className="form-group">
          <label htmlFor="test">Expires On</label>
          <input  onChange={this.handleInputChange} name="expirydate"  value={special.get('expirydate')} type="date" className="form-control" id="expiry-date" placeholder="special of the day"/>
        </div>
        <div>
          <span type="button" onClick = {this.removeSpecial} className = "glyphicon glyphicon-minus"></span>
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
  console.log('business', this.state);
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
     <div className="col-md-6">
       <form onSubmit={this.handleSubmit}>
         <h3>Specials</h3>
         <div className="form-inLine">
           {specialsFormset}
             <div>
               <span type="button" onClick = {this.props.addSpecial} className = "glyphicon glyphicon-plus"></span>
             </div>
         </div>
        <button type="submit" className="btn btn-success">Save Specials</button>
       </form>
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
    // var specials = new SpecialCollection();
    var specials = business.get('specials');
    console.log('spcialas add @ form', specials);
   var special = new Special();

    specials.add([{}]);
    this.setState({business: business})
    console.log('add state', this.state);
  },

  removeSpecial: function(special){
    var business = this.state.business;
    var specialsCollection = business.get('specials');
    specialsCollection.remove(special.cid);
    this.setState({business: business});
  },

  saveSpecial: function(specialData){
    var business = this.state.business;
    console.log('special @ save form', business);
    console.log('special', specialData);
    business.set(specialData);
    console.log('business', business);
    business.save();
  },

  render: function(){
    console.log('dashboard state',this.state.business.get('specials'));
    return(
      <div className="col-md-10">
        <h1>Dashboard</h1>
        <Dashboard  business={this.state.business} />
        <SpecialsForm  business={this.state.business} saveSpecial={this.saveSpecial} specials={this.state.business.get('specials')} removeSpecial={this.removeSpecial} addSpecial={this.addSpecial}/>
      </div>
    )
  }
});

module.exports = {
  DashboardContainer: DashboardContainer,
}
