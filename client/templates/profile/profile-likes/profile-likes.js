Template.profileLikes.onCreated(function() {
	this.editMode = new ReactiveVar(false);
	this.addLike = new ReactiveVar(false);

	// this.staticLikes = Pets.findOne().profile.likes;
	var userId = Meteor.userId();
	console.log(userId);
	console.log(Pets.find(userId).fetch());
	this.staticLikes = Pets.find(Meteor.userId()).fetch().profile.likes;
});

Template.profileLikes.onRendered(function() {

});

Template.profileLikes.helpers({
	pet: function() {
		return Pets.findOne();
	},
	staticLikes: function() {
		return Template.instance().staticLikes;
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
	'click .btn-save-likes': function (e, template) {
		e.preventDefault();

	},
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
	'submit .save-likes': function (e, template) {
		e.preventDefault();

	},
	'click .btn-add-like': function (e, template) {
		e.preventDefault();

		template.staticLikes.push({thing: 'aa'});
		console.log(template.staticLikes);
		Tracker.flush()
		// var like = e.target.thing.value;
		// Meteor.call('Pets.addLike', {
		// 	like: like
		// });
	}
});
