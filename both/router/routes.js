if (Meteor.isCordova) {
	// profile test
	Router.route('/', {
		name: 'profileMobile',
	});

} else {

	// Home Route
	Router.route('/', {
		name: 'landing'
	});
	// Profile Route
	Router.route('/profile', {
		name: 'profile'
	});

	// Dashboard route
	Router.route('/dashboard', {
		name: 'dashboard',
		// waitOn: function() {
		//   return this.subscribe('items');
		// },
		// data: {
		//   items: Items.find({})
		// },
		// onBeforeAction: function (pause) {
		// AccountsTemplates.ensureSignedIn.call(this, pause);
		// },
		// onAfterAction: function () {

		// }
	});

	Router.route('/admin', {
		name: 'admin',
		// data: {
		//   emails: EmailCollect.find({})
		// },
	});
}
