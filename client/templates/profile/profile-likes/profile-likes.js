Template.profileLikes.onCreated(function() {
	this['editMode'] = new ReactiveVar(false);
});

Template.profileLikes.onRendered(function() {

});

Template.profileLikes.helpers({
	pet: function() {
		return Pets.findOne();
	},
	likes: function () {
		// return Pets.find().fetch().profile.likes;
		return Pets.findOne().profile.likes;
	},
	editMode: function () {
		return Template.instance()['editMode'].get();
	},
	hasLikes: function() {
		return Pets.findOne().profile.likes.length > 0;
	}
});

Template.profileLikes.events({
	// 'click .btn-cancel-likes': function(e, template) {
	// 	e.preventDefault();
	// 	template['editMode'].set(false);
	// },
	'click .btn-edit-likes': function(e, template) {
		template['editMode'].set(true);
	},
	'click .btn-delete-like': function(e, template) {
		e.preventDefault();
		var petId = Session.get('petId');
		var like = e.target.attributes['data-like'].value;
		console.log('delete-like >',like);
		Meteor.call('Pets.deleteLike', petId, like, function (error) {
			if (error) {
				alert(error);
				return;
			}

			console.log('delete-like success! > ',like);
		})
	},
	'submit .save-likes': function (e, template) {
		e.preventDefault();
		var petId = Session.get('petId');
		var likes = [];
		_.forEach(e.target.thing, function (thing) {
			if (thing.value && thing.value.length > 0) {
				likes.push({thing: thing.value});
			}
		});
		console.log('save-likes submit > ',likes);
		Meteor.call('Pets.updateLikes', petId, likes, function (error, data) {
			if (error) {
				alert(error);
				return;
			}

			console.log('save-like success! > ',likes);
			template['editMode'].set(false);
		})
	},

	'submit .add-like': function (e, template) {
		e.preventDefault();
		var petId = Session.get('petId');
		var like = e.target.thing.value;
		console.log('add-like submit > ',like);
		Meteor.call('Pets.insertLike', petId, like, function (error) {
			if (error) {
				alert(error);
				return;
			}

			console.log('add-like success! > ',like);
		});
	},

});
