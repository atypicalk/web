Meteor.methods({
	updatePetProfilePic: function(params) {
		var pet_id = params.pet_id;
		var public_id = params.public_id;
		Pets.update({_id: pet_id},{$set:{'profile.photo.public_id': public_id}});
	}
});
