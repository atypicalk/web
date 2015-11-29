LandingController = AppController.extend({
	waitOn: function() {
		// return this.subscribe('items');
	},
	data: {
		// items: Items.find({})
	},
	onAfterAction: function() {
		Meta.setTitle('PetPal - Home');
	}

});

LandingController.events({
	// 'click [data-action=doSomething]': function(event, template) {
	// 	event.preventDefault();
	// }
});
