Template.profile.onCreated(function() {
	var petId = Pets.find().fetch()[0]._id;
	Session.set('petId', petId);
});

Template.profile.onRendered(function() {

});

Template.profile.events({
	'click .btn-add-pet': function(e) {
		Meteor.call('Users.addPet', function (error) {
			if (error) {
				alert(error);
				console.log(error);
				return;
			}
			console.log('Users.addPet >> SUCCESS!');
		});
	},
	'submit .update-pet': function(e) {
		e.preventDefault();
		var target = e.target;
		var params = {
			_id: this._id,
			name: target.name ? target.name.value : this.name,
			breed: target.breed ? target.breed.value : this.breed,
			age: target.age ? target.age.value : this.age,
			gender: target.gender ? target.gender.value : this.gender,
		}

		Meteor.call('Pets.updateProfile', params, function (error) {
			if (error) {
				alert(error);
				console.log(error);
				return;
			}
			console.log('Pets.save >> SUCCESS!');
		});
	}
});

Template.profile.helpers({
	user: function () {
		return Meteor.users.findOne();
	},
	pet: function () {
		return Pet.findOne();
	},
})
