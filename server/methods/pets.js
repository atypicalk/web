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

	// PROFILE INFO
	'Pets.updateProfileInfo': function (petId, profile) {
		// console.log('Users.updateProfileInfo', petId, profile);
		Pets.update({_id: petId},{$set: {
			'profile.name': profile.name,
			'profile.age': profile.age
		}});
	},

	// HISTORY
	'Pets.updateHistory': function (petId, history) {
		// console.log('Users.updateProfileInfo', petId, profile);
		Pets.update({_id: petId},{$set: {
			'profile.history': history,
		}});
	},

	// LIKES
	'Pets.insertLike': function (petId, like) {
		Pets.update({_id: petId}, {$push: {'profile.likes': {thing: like}}});
	},
	'Pets.deleteLike': function (petId, like) {
		Pets.update({_id: petId}, {$pull: {'profile.likes': {thing: like}}});
	},
	'Pets.updateLikes': function (petId, likes) {
		Pets.update({_id: petId}, {$set: {'profile.likes': likes}});
	},

	// DISLIKES
	'Pets.insertDislike': function (petId, dislike) {
		Pets.update({_id: petId}, {$push: {'profile.dislikes': {thing: dislike}}});
	},
	'Pets.deleteDislike': function (petId, dislike) {
		Pets.update({_id: petId}, {$pull: {'profile.dislikes': {thing: dislike}}});
	},
	'Pets.updateDislikes': function (petId, dislikes) {
		Pets.update({_id: petId}, {$set: {'profile.dislikes': dislikes}});
	}
});
