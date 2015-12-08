Template.profile.onCreated(function() {
	var petId = Pets.findOne()._id;
	Session.set('petId', petId);
});

Template.profile.onRendered(function() {

});

Template.profile.events({

});

Template.profile.helpers({
	user: function () {
		return Meteor.user();
	},
	pet: function () {
		return Pet.findOne();
	},
})
