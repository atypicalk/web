Template.headerCta.helpers({
	validate: function () {
		console.log('hoho validate!');
	},

	emails: function () {
		return EmailCollect.find({});
	}
});

Template.headerCta.events({
  'submit .form-email': function (e) {
    e.preventDefault();

    var emailInput = e.target.email;
    var email = emailInput.value;

    // console.log('emailcollect >>',email,EmailCollect.find({}));
    
    Meteor.call('addEmailCollect', email);

    emailInput.value = '';
  }
});
