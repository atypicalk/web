Template.profileInfo.onCreated(function() {
	this['editMode'] = new ReactiveVar(false);
});

Template.profileInfo.onRendered(function() {

});

Template.profileInfo.helpers({
	user: function() {
		return Meteor.user();
	},
	userProfile: function (key) {
		var profile = Meteor.user().profile;
		if (!key) {
			return profile;
		} else {
			var value = profile[key];
			return (value && value.length > 0) ? value : '--';
		}
	},
	userLocation: function (key) {
		var location = Meteor.user().profile.location;
		if (!key) {
			return location;
		} else {
			var value = location[key];
			return (value && value.length > 0) ? value : '--';
		}
	},
	pet: function() {
		var pet = Pets.findOne();
		console.log('pet:',pet);
		return pet;
	},
	petProfile: function (key) {
		var profile = Pets.findOne().profile;
		if (!key) {
			return profile;
		} else {
			var value = profile[key];
			return (value && value.length > 0) ? value : '--';
		}
		return profile;
	},
	editMode: function () {
		return Template.instance()['editMode'].get();
	}
});

Template.profileInfo.events({
	'click .btn-edit-info': function (e, template) {
		e.preventDefault();
		console.log('edit info!');
		template['editMode'].set(true);
	},
	'submit .form-info': function (e, template) {
		e.preventDefault();

		var target = e.target;
		var userProfile = {
			firstName: target.firstName.value,
			lastName: target.lastName.value,
			location: {
				city: target.city.value,
				state: target.state.value,
				zipcode: target.zipcode.value,
				country: target.country.value
			}
		}

		console.log('submittin form-info >>', userProfile);
		Meteor.call('Users.updateProfileInfo', userProfile, function (error) {
			if (error) {
				alert(error);
				return;
			}

			console.log('submit form-info >> success!', userProfile);
			template['editMode'].set(false);
		})
	}
});
