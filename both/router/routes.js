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
		controller: 'ProfileController',
		loadingTemplate: 'loading',
	});
	// Profile Route
	Router.route('/PetProfile/:_id', {
		name: 'PetProfile',
		controller: 'PetProfileController',
		loadingTemplate: 'loading',
    data: function() {
  		pets = Pets.find();
  		thisUser = Meteor.user();

      params = this.params;

      //thisPetsOwner = Users.getUserById(params._id);
      isThisProfileCurrentUsersProfile = (this.params._id == Meteor.userId());
      return true;
  	}
	});

	// Profile Route
	Router.route('/privacypolicy', {
		name: 'privacypolicy',
		onAfterAction: function () {
			window.scrollTo(0, 0);
		}
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

	Router.route('post/:id', {
		waitOn: function() {
			return [
					Meteor.subscribe('post', this.params.id),
					Meteor.subscribe('postComments', this.params.id)
			]
		},
		data: function() {
			return {
					post: Posts.findOne({_id: this.params.id}),
					comments: Comments.find({postId: this.params.id})
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
