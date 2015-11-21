if (Meteor.isServer) {
	Meteor.methods({
		addEmailCollect: function (email) {
			return EmailCollect.insert({
				email: email
			}, {
				validate: true
			})
		}
	});
}