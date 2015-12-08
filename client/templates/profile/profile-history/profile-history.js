Template.profileHistory.onCreated(function() {
	this['editMode'] = new ReactiveVar(false);
});

Template.profileHistory.onRendered(function() {

});

Template.profileHistory.helpers({
	pet: function() {
		return Pets.findOne();
	},
	petProfile: function (key) {
		var profile = Pets.findOne().profile;
		if (!key) {
			return profile;
		} else {
			var value = profile[key];
			return (value && value.length > 0) ? value : '--';
		}
	},
	editMode: function () {
		return Template.instance()['editMode'].get();
	}
});

Template.profileHistory.events({
	'click .btn-edit-history': function (e, template) {
		e.preventDefault();
		template['editMode'].set(true);
	},
	'submit .save-history': function (e, template) {
		e.preventDefault();
		var petId = Session.get('petId');
		var history = e.target.history.value;

		console.log('save-history submit > ',history);
		Meteor.call('Pets.updateHistory', petId, history, function (error, data) {
			if (error) {
				alert(error);
				return;
			}

			template['editMode'].set(false);
			console.log('save-history success! > ',history);
		});
	}
});
