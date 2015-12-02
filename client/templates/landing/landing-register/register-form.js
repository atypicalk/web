Template.register.events({
	'click button#register-form' : function(e, t) {
		console.log("Registering");
		e.preventDefault();
		var email = $('#register-email').val();
		var password = $('#register-password').val();

		// Trim and validate the input
		if (email && password) {
			Accounts.createUser({email: email, password : password}, function(err){
				if (err) {
					// Inform the user that account creation failed
					console.log(err);
				}
				else {
					// Success. Account has been created and the user
					// has logged in successfully.
					console.log("Registered!");
					$('#sign-in-collapse-toggle-button').show();
					$('#sign-up-collapse-toggle-button').show();
					$('#sign-up-collapse').collapse("hide");
				}

			});
		}
		else {
			console.log("No email or password");
		}
	},
	'click button#register-form-cancel' : function(e, t){
		e.preventDefault();
		console.log("Canceling Registering");
		$('#register-email').val('');
		$('#register-password').val('');
		$('#sign-in-collapse-toggle-button').show();
		$('#sign-up-collapse-toggle-button').show();
		$('#sign-up-collapse').collapse("hide");
		console.log("..done");
	}
});
