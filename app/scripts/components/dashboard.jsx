var React = require('react');
var Backbone = require('backbone');
var RegistrationContainer = require('../components/registration.jsx').RegistrationContainer;
var Dashboard = require('../components/registration.jsx').Dashboard;
var models = require('../models/business');
var BusinessCollection = require('../models/business.js').BusinessCollection;
var User= require('../parseUtilities').User;





var Dashboard = React.createClass({
  getInitialState: function(){
    return this.props.business.toJSON();
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.business.toJSON());
  },

  render: function(){
    var business = this.props.business;
    console.log('bizz data', business);
    return(
      <div className="dashboard-container col-md-4 col-md-offset-1">
        <h1>Business Dashboard</h1>
        <img src={business.get('image_url')}/>
          <ul>
            <li>{business.get('name')}</li>
            <li>{business.get('phone')}</li>
            <li>{business.get('address')}, {business.get('city')}, {business.get('state')}, {business.get('zip')}</li><br/>
          </ul>
          <div className="dashboard-review">
            <h4>Recent Review</h4>
            <ul>
              <li><img src={business.get('rating_img_url')}/></li>
              <li><img src={business.get('snippet_image_url')}/><p>{business.get('snippet_text')}</p></li>
            </ul>
          </div>
          <div className="map">
            <img src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
&markers=color:red%7Clabel:C%7C40.718217,-73.998284
&key=AIzaSyAf8NIWecbThX7FKm5y5cQlFd5wGeBjhoU"/>
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
    return this.props.special.toJSON();
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.special.toJSON());
  },



  handleInputChange: function(e){
    var target = e.target;
    // console.log('target', target);
    var newState = {};
    newState[target.name] = target.value;
    this.setState(newState);
    this.props.special.set(target.name, target.value);
  },


  render: function(){
    return(
      <div className="spcials col-md-12">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input  onChange={this.handleInputChange} name="name"  value={this.state.name} type="text" className="form-control" id="name" placeholder="special of the day"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input  onChange={this.handleInputChange} name="description"  value={this.state.description} type="text" className="form-control" id="description" placeholder="special of the day"/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input  onChange={this.handleInputChange} name="price"  value={this.state.price} type="text" className="form-control" id="price" placeholder="special of the day"/>
        </div>
        <div className="form-group">
          <label htmlFor="test">Effective Date</label>
          <input  onChange={this.handleInputChange} name="effective-date"  value={this.state.effectivedate} type="date" className="form-control" id="date" placeholder="special of the day"/>
        </div>
        <div className="form-group">
          <label htmlFor="test">Expires On</label>
          <input  onChange={this.handleInputChange} name="expiry-date"  value={this.state.expirydate} type="date" className="form-control" id="expiry-date" placeholder="special of the day"/>
        </div>
        <div>
          <span type="button" onClick = {this.props.removeSpecial} className = "glyphicon glyphicon-minus"></span>
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
  this.props.saveSpecial(this.state);
},

 render: function(){
   var self = this;
   var business= self.props.business;
   var specialsFormset = business.get('specials').map(function(special){
    //  console.log('get specials', business.get('specials'));
     return (
       <div key={special.cid}>
         <SpecialsFormList special={special}/>

       </div>
     )
   });
   return (
     <div className="col-md-7">
       <form onSubmit={this.handleSubmit}>
         <h3>Specials</h3>
         <div className="form-inLine">
           {specialsFormset}
             <div>
               <span type="button" onClick = {this.props.addSpecial} className = "glyphicon glyphicon-plus"></span>
               <span type="button" onClick = {this.props.removeSpecial} className = "glyphicon glyphicon-minus"></span>
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
    var specials = business.get('specials');
    console.log('spcialas add @ form', specials);
    specials.add([{}]);
    this.setState({business: business})
    console.log(this.state);
  },

  removeSpecial: function(){
    var business = this.state.business;
    var specials = business.get('specials');
    console.log('specials remove @ form', specials);
    specials.pop([{}]);
    this.setState({business: business})
  },

  saveSpecial: function(specialData){
    var business = this.state.business;
    console.log('special @ save form', business);
    business.set(specialData);
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
