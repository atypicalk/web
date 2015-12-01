var isAdmin = function(uid) {
	return true;
}

// Meteor.publish('users', function() {
// 	if (isAdmin(this.userId)) {
// 		return Meteor.users.find();
// 	} else {
// 		return Meteor.users.find({
// 			_id: this.userId
// 		});
// 	}
// });

Meteor.publishComposite('userProfile', function() {
	return {
		find: function() {
			return Meteor.users.find({
				_id: this.userId
			});
		},
		children: [{
			find: function(user) {
				return Pets.find({
					userId: user._id
				});
			}
		}]
	};
});
