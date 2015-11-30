Meteor.methods({
	'Pets.updateProfilePic': function(params) {
		var petId = params.petId;
		var public_id = params.public_id;
		Pets.update({_id: petId},{$set:{'profile.photo.public_id': public_id}});
	},
	'Pets.updateProfile': function(params) {
		var petId = params._id;
		// var public_id = params.public_id;
		Pets.update({_id: petId},{$set:{
			'profile.name': params.name,
			'profile.breed': params.breed,
			'profile.age': params.age,
			'profile.gender': params.gender,
		}});
	},
});
