Meteor.methods({
	'Pets.updateProfilePic': function(params) {
		var petId = params.petId;
		var photo = params.photo;
		Pets.update({_id: petId},{$set:{'profile.photo.public_id': photo}});
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
	'Pets.addLike': function (params) {
		var petId = Pets.findOne()._id;
		var like = params.like;
		console.log(petId,like);
		Pets.update({_id: petId}, {$push: {'profile.likes': {thing: like}}});
	}
});
