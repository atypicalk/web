Meteor.methods({
	'Users.createPhantom': function(email) {

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
	},

	'Users.addPet': function () {
		var userId = this.userId;
		var petId = Pets.insert({userId: userId});
		return Meteor.users.update({_id: userId}, {$push: {'profile.pets': petId}});
	},
	'Users.removePet': function (petId) {
		var userId = this.userId;
		Pets.remove({_id: petId});
		Meteor.users.update({_id: userId}, {$pull: {'profile.pets': petId}});
	}
});