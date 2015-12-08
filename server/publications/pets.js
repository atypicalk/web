// JY: Is this available here? shouldn't we take userId as an arg?
Meteor.publishComposite('pets', function() {
	return {
		find: function() {
			console.log('pet pub',this.userId);
			return Pets.find({userId: this.userId});
		},
		children: [
			{
				find: function(item) {
					return Meteor.users.find();
				}
			}
		]
	};
});
