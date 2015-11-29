AdminController = AppController.extend({
	waitOn: function() {
		// return this.subscribe('items');
	},
	data: {
		// items: Items.find({})
	},
	onAfterAction: function() {
		Meta.setTitle('PetPal - Admin');
	}

});

AdminController.events({
	// 'click [data-action=doSomething]': function(event, template) {
	// 	event.preventDefault();
	// }
});
