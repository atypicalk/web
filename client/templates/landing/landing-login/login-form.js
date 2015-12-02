Template.login.events({

	'click button#login-form' : function(e, t){
		console.log("Signing In");
		e.preventDefault();
		// retrieve the input field values
		var email = $('#login-email').val();
		var password = $('#login-password').val();

		// Trim and validate your fields here....

		// If validation passes, supply the appropriate fields to the
		// Meteor.loginWithPassword() function.
		if (email && password) {
			Meteor.loginWithPassword(email, password, function(err){
				if (err) {
					// The user might not have been found, or their passwword
					// could be incorrect. Inform the user that their
					// login attempt has failed.
					console.log(err);
				}
				else {
					// The user has been logged in.
					console.log("Logged In!");
					$('#sign-in-collapse-toggle-button').show();
					$('#sign-up-collapse-toggle-button').show();
					$('#sign-in-collapse').collapse("hide");
				}
			});
		}
		else {
			console.log("No email or password");
		}
	},
	'click button#login-form-cancel' : function(e, t){
		e.preventDefault();
		console.log("Canceling Signing In");
		$('#login-email').val('');
		$('#login-password').val('');
		$('#sign-in-collapse-toggle-button').show();
		$('#sign-up-collapse-toggle-button').show();
		$('#sign-in-collapse').collapse("hide");
		console.log("..done");
	}
});
