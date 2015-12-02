Template.landingJumbotron.helpers({
	validate: function () {
		console.log('hoho validate!');
	},

	emails: function () {
		return EmailCollect.find({});
	},

	email: function () {
		return Session.get('email');
	},

	image: {
		public_id: Meteor.settings.public.cloudinary.folders.landing + 'header-photo.jpg'
	},

});

Template.landingJumbotron.events({
  'submit .form-email': function (e) {
    e.preventDefault();

    var emailInput = e.target.email;
    var email = emailInput.value;
    var emailValid = validateEmail(email);

    if (emailValid) {
	    Meteor.call('Users.createPhantom', email, function (error) {
	    	if (error) {
	    		console.log('error!', error);
	    		return;
	    	}

	    	Session.set('email', email)
	    	emailInput.value = '';
	    });
    }
  }
});


if (Meteor.isClient) {

	Template.landingJumbotron.onRendered(function() {

		this.$('.header-video').each(function(i, elem) {
			headerVideo = new HeaderVideo({
				element: elem,
				media: '.header-video__media',
				playTrigger: '.header-video__play-trigger',
				closeTrigger: '.header-video__close-trigger'
			});
		});
	});
}
