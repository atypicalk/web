if (Meteor.isServer) {
	Meteor.methods({
		addEmailCollect: function (email) {
			return EmailCollect.insert({email: email}, {validate: true},
				function (error, data) {
					if (error) return false;

			    	Email.send({
			    		from: 'info@getpetpal.com',
			    		to: email,
			    		subject: 'Welcom to PetPal!',
			    		html: 'Thanks for registering!'
			    	});
				});
		}
	});
}