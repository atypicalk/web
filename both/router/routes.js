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

Router.plugin('ensureSignedIn', {
  only: ['profile', 'admin']
});

