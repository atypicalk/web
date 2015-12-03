if (Meteor.isCordova) {
	// profile test
	Router.route('/', {
		name: 'profileMobile',
	});

} else {

	// Home Route
	Router.route('/', {
		name: 'landing',
		controller: 'LandingController'
	});
	
	// Profile Route
	Router.route('/profile', {
		name: 'profile',
		controller: 'ProfileController'
	});
	
	// User Route
	Router.route('/user/:_id', {
		name: 'userPage',
		data: function() {
      var userId = this.params._id;
      return Meteor.users.findOne({ _id: userId });
    }
	});

	// News Feed route
	Router.route('/newsfeed', {
    name: 'newsfeed',
    onBeforeAction: function(){
      var currentUser = Meteor.userId();
      if(currentUser) {
        this.next();
      } else {
        this.render("login");
      }
    }
	});

  // Admin
	Router.route('/admin', {
		name: 'admin',
		controller: 'AdminController'
	});

	// Dashboard route
	// Router.route('/dashboard', {
	// 	name: 'dashboard',
	// 	waitOn: function() {
	// 	  return this.subscribe('items');
	// 	},
	// 	data: {
	// 	  items: Items.find({})
	// 	},
	// 	onBeforeAction: function (pause) {
	// 	AccountsTemplates.ensureSignedIn.call(this, pause);
	// 	},
	// 	onAfterAction: function () {

	// 	}
	// });

}

// Router.plugin('ensureSignedIn', {
//   only: ['profile', 'admin']
// });

