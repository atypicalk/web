Schema = {};

Schema.UserLocation = new SimpleSchema({
	city: {
		type: String,
		optional: true
	},
	state: {
		type: String,
		optional: true
	},
	zipcode: {
		type: String,
		regEx: /^[0-9]{5}$/,
		optional: true
	},
	country: {
		type: String,
		// regEx: /^[A-Z]{2}$/,
		optional: true
	}
});

Schema.UserProfile = new SimpleSchema({
	firstName: {
		type: String,
		optional: true
	},
	lastName: {
		type: String,
		optional: true
	},
	gender: {
		type: String,
		allowedValues: ['Male', 'Female'],
		optional: true
	},
	organization: {
		type: String,
		optional: true
	},
	website: {
		type: String,
		regEx: SimpleSchema.RegEx.Url,
		optional: true
	},
	bio: {
		type: String,
		optional: true
	},
	location: {
		type: Schema.UserLocation,
		optional: true
	},
	isPhantom: {
		type: Boolean,
		optional: true
	},
	photo: {
		type: Object,
		optional: true
	},
	'photo.public_id': {
		type: String
	},
	// only 1 pet for v1 release
	pet: {
		type: String,
		optional: true
	}
	// pets: {
	// 	type: Array,
	// 	defaultValue: []
	// },
	// 'pets.$': {
	// 	type: String,
	// }
});

Schema.User = new SimpleSchema({
	username: {
		type: String,
		// For accounts-password, either emails or username is required, but not both. It is OK to make this
		// optional here because the accounts-password package does its own validation.
		// Third-party login packages may not require either. Adjust this schema as necessary for your usage.
		optional: true
	},
	emails: {
		type: Array,
		// For accounts-password, either emails or username is required, but not both. It is OK to make this
		// optional here because the accounts-password package does its own validation.
		// Third-party login packages may not require either. Adjust this schema as necessary for your usage.
		optional: true
	},
	"emails.$": {
		type: Object
	},
	"emails.$.address": {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	"emails.$.verified": {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	profile: {
		type: Schema.UserProfile,
		defaultValue: {}
		// optional: true
	},
	// Make sure this services field is in your schema if you're using any of the accounts packages
	services: {
		type: Object,
		optional: true,
		blackbox: true
	},
	// Add `roles` to your schema if you use the meteor-roles package.
	// Option 1: Object type
	// If you specify that type as Object, you must also specify the
	// `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
	// Example:
	// Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
	// You can't mix and match adding with and without a group since
	// you will fail validation in some cases.
	roles: {
		type: Object,
		optional: true,
		blackbox: true
	},
	// Option 2: [String] type
	// If you are sure you will never need to use role groups, then
	// you can specify [String] as the type
	roles: {
		type: [String],
		optional: true
	}
});

Meteor.users.attachSchema(Schema.User);

Meteor.users.before.insert(function (id, doc) {
	console.log(id, doc);
	doc.profile.pet = Pets.insert({userId: doc._id});
})
