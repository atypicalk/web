Template.headerCta.helpers({
	validate: function () {
		console.log('hoho validate!');
	},

	emails: function () {
		return EmailCollect.find({});
	},

	email: function () {
		return Session.get('email');
	}
});

Template.headerCta.events({
  'submit .form-email': function (e) {
    e.preventDefault();

    var emailInput = e.target.email;
    var email = emailInput.value;
    var emailValid = validateEmail(email);

    if (emailValid) {
	    Meteor.call('addEmailCollect', email);
	    Session.set('email', email);
    	emailInput.value = '';
    } else {
    	console.log('INVALID!',email);
    }
  }
});
