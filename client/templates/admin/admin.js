Template.admin.onRendered(function() {

});

Template.admin.helpers({
	usersData: function() {
		return Meteor.users.find();
	}
});

Template.admin.events({
	'submit .add-user': function(e) {
		e.preventDefault();

		var target = e.target;
		var email = target.email.value;
		var password = target.password.value;
		var emailValid = UI.__globalHelpers['validateEmail'](email);

		if (emailValid) {

			if (password) {
				Meteor.call('createUser', {
					email: email,
					password: password,
					profile: {}
				});
			} else {
				Meteor.call('Users.createPhantom', email);
			}

			target.email.value = '';
			$('#addUserModal').modal('hide');
		} else {
			console.log('INVALID!', email);
		}
	}
});
