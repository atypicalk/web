ProfileController = _AppController.extend({
	waitOn: function() {
		return this.subscribe('pets');
	},
	data: {
		pets: Pets.find()
	},
	onAfterAction: function() {
		Meta.setTitle('PetPal - Profile');
	}

});

ProfileController.events({
	// 'click [data-action=doSomething]': function(event, template) {
	// 	event.preventDefault();
	// }
});
