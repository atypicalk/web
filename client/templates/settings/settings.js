Template.settings.onRendered(function() {

});

Template.settings.events({
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
	'click .btn-remove-pet': function(e) {
		Meteor.call('Users.removePet', this._id, function (error) {
			if (error) {
				alert(error);
				console.log(error);
				return;
			}
			console.log('Users.removePet >> SUCCESS!');
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

Template.settings.helpers({
	pets: function () {
		return Pets.find();
	}
})
