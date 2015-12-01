Template.profileLikes.onCreated(function() {
	this.editMode = new ReactiveVar(false);
	this.addLike = new ReactiveVar(false);
});

Template.profileLikes.onRendered(function() {
	
});

Template.profileLikes.helpers({
	pet: function() {
		return Pets.findOne();
	},
	likes: function () {
		return Pets.findOne().profile.likes;
	},
	editMode: function () {
		return Template.instance().editMode.get();
	},
	addLike: function () {
		return Template.instance().addLike.get();
	},
	hasLikes: function() {
		return Pets.findOne().profile.likes.length > 0;
	}
});

Template.profileLikes.events({
	'click .btn-cancel-likes': function(e, template) {
		e.preventDefault();
		template.editMode.set(false);
	},
	'click .btn-add-like': function(e, template) {
		template.addLike.set(true);
	},
	'click .btn-edit-likes': function(e, template) {
		template.editMode.set(true);
	},
	'submit .add-like': function (e, template) {
		console.log(template)
		e.preventDefault();

		var like = e.target.thing.value;
		Meteor.call('Pets.addLike', {
			like: like
		});
	}
});
