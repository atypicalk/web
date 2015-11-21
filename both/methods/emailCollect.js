Meteor.methods({
	addEmailCollect: function (email) {
		EmailCollect.insert({
			email: email
		})
	}
})