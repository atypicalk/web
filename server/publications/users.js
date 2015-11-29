var isAdmin = function(uid) {
	return true;
}

Meteor.publish('users', function() {
	if (isAdmin(this.userId)) {
		return Meteor.users.find();
	} else {
		return Meteor.users.find({
			_id: this.userId
		});
	}
});

Meteor.publishComposite('users', function() {
  return {
    find: function() {
      return Items.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  };
});
