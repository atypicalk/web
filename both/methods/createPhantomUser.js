if (Meteor.isServer) {
	Meteor.methods({
		createPhantomUser: function(email) {

			var password = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
			var profile = {
				isPhantom: true
			};

			var params = {
				email: email,
				password: password,
				profile: profile
			};

			console.log('Accounts.createUser >> params:', params);
			Accounts.createUser(params);

			Email.send({
				from: 'info@getpetpal.com',
				to: email,
				subject: 'Welcom to PetPal!',
				html: 'Thanks for registering!'
			});
		}
	});
}
