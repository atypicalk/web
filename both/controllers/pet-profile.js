PetProfileController = _AppController.extend({
	waitOn: function() {
		// return this.subscribe('userProfile');
		return this.subscribe('pets');
	},
	data: {

	},
	onAfterAction: function() {
		Meta.setTitle('PetPal - Profile');
	}

});

PetProfileController.events({
	// 'click [data-action=doSomething]': function(event, template) {
	// 	event.preventDefault();
	// }
});
