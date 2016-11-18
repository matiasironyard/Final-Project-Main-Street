



componentWillMount: function(){
  var self = this;
  var businessCollection = new BusinessCollection();
  businessCollection.parseWhere('user', '_User', User.current().get('objectId')).fetch().then(function(){
    if(businessCollection.length == 1){
      self.setState({business: businessCollection.first()});
    } else {
      YelpBusiness.fetch().then(function(){
        var business = self.state.business;
        var location = business.get('location');
        var categories = business.get('categories');
        var category1 = categories[0];
        var category2 = categories[1];
        business.set(
          {
            name: business.get('name'),
          }
        )
      })
    }
  })
},
