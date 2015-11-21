//TODO: remove package "autopublish"
// it is for prototyping and auto-publishes
// all documents to any client

// Define Schema
var EmailCollectSchema = new SimpleSchema({

	email: {
		type: String,
		label: "Email"
	},

	createdAt: {
		type: Date,
		denyUpdate: true,
		autoValue: function() {
			if (this.isInsert) {
				return new Date;
			} else if (this.isUpsert) {
				return {
					$setOnInsert: new Date
				};
			} else {
				this.unset(); // Prevent user from supplying their own value
			}
		}
	},

	// updatedAt: {
	// 	type: Date,
	// 	autoValue: function() {
	// 		if (this.isUpdate) {
	// 			return new Date();
	// 		}
	// 	},
	// 	denyInsert: true,
	// 	optional: true
	// }
});

// Define Collection
EmailCollect = new Mongo.Collection('emailCollect');

// Collection Helpers https://github.com/dburles/meteor-collection-helpers
EmailCollect.helpers({

});

EmailCollect.attachSchema(EmailCollectSchema);
