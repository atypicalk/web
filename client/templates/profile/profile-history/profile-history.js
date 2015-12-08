Template.profileDislikes.onCreated(function() {
	this['editMode'] = new ReactiveVar(false);
});

Template.profileDislikes.onRendered(function() {

});

Template.profileDislikes.helpers({
	pet: function() {
		return Pets.find().fetch()[0];
	},
	petName: function () {
		return Pets.find().fetch()[0].profile.name;
	},
	// dislikes: function () {
	// 	// return Pets.find().fetch().profile.likes;
	// 	return Pets.find().fetch()[0].profile.dislikes;
	// },
	// editMode: function () {
	// 	return Template.instance()['editMode'].get();
	// },
	// hasDislikes: function() {
	// 	return Pets.find().fetch()[0].profile.dislikes.length > 0;
	// }
});

Template.profileDislikes.events({
	'click .btn-edit-dislikes': function(e, template) {
		template['editMode'].set(true);
	},
	'click .btn-delete-dislike': function(e, template) {
		e.preventDefault();
		var petId = Session.get('petId');
		var dislike = e.target.attributes['data-dislike'].value;
		console.log('delete-dislike >',dislike);
		Meteor.call('Pets.deleteDislike', petId, dislike, function (error) {
			if (error) {
				alert(error);
				return;
			}

			console.log('delete-dislike success! > ',dislike);
		})
	},
	'submit .save-dislikes': function (e, template) {
		e.preventDefault();
		var petId = Session.get('petId');
		var dislikes = [];
		_.forEach(e.target.thing, function (thing) {
			if (thing.value && thing.value.length > 0) {
				dislikes.push({thing: thing.value});
			}
		});
		console.log('save-dislikes submit > ',dislikes);
		Meteor.call('Pets.updateDislikes', petId, dislikes, function (error, data) {
			if (error) {
				alert(error);
				return;
			}

			console.log('save-dislike success! > ',dislikes);
			template['editMode'].set(false);
		})
	},

	'submit .add-dislike': function (e, template) {
		e.preventDefault();
		var petId = Session.get('petId');
		var dislike = e.target.thing.value;
		console.log('add-dislike submit > ',dislike);
		Meteor.call('Pets.insertDislike', petId, dislike, function (error) {
			if (error) {
				alert(error);
				return;
			}

			console.log('add-dislike success! > ',dislike);
		});
	},

});
