Template.admin.onRendered(function() {

});

Template.admin.helpers({
	emails: function () {
		return EmailCollect.find();
	}
});

Template.admin.events({
	'click [data-action="add-user"]': function (e) {
		e.preventDefault();

		var emailInput = e.target.email;
	    var email = emailInput.value;
	    var emailValid = validateEmail(email);

	    if (emailValid) {
		    Meteor.call('addEmailCollect', email);
		    // Session.set('email', email);
	    	emailInput.value = '';
	    	$('#addItemModal').modal('hide');
	    } else {
	    	console.log('INVALID!',email);
	    }
	}
});
