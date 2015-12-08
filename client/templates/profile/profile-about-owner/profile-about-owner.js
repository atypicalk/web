Template.profileAboutOwner.onCreated(function() {
	this['editMode'] = new ReactiveVar(false);
});

Template.profileAboutOwner.onRendered(function() {

});

Template.profileAboutOwner.helpers({
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
	userPic: function() {
		var photo = Meteor.user().profile.photo;
		if (!photo) {
			return;
		} else {
			return photo.public_id + '.png';
		}
	},

	editMode: function () {
		return Template.instance()['editMode'].get();
	}
});

Template.profileAboutOwner.events({
	'click .btn-edit-about': function (e, template) {
		e.preventDefault();
		template['editMode'].set(true);
	},
	'submit .save-about': function (e, template) {
		e.preventDefault();
		var petId = Session.get('petId');
		var about = e.target.about.value;

		console.log('save-about submit > ',about);
		Meteor.call('Users.updateAbout', about, function (error, data) {
			if (error) {
				alert(error);
				return;
			}

			template['editMode'].set(false);
			console.log('save-about success! > ',about);
		});
	}
});
