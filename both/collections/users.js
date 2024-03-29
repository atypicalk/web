Schema = {};

Schema.UserCountry = new SimpleSchema({
	name: {
		type: String
	},
	code: {
		type: String,
		regEx: /^[A-Z]{2}$/
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
	country: {
		type: Schema.UserCountry,
		optional: true
	},
	isPhantom: {
		type: Boolean,
		optional: true
	},
	ownerPhoto: {
		type: Object,
		optional: true
	},
	'ownerPhoto.public_id': {
		type: String
	},
	petPhoto: {
		type: Object,
		optional: true
	},
	'petPhoto.public_id': {
		type: String,
	},
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
		optional: true
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


var isAdmin = function(uid) {
	return true;
}

if (Meteor.isServer) {
	Meteor.publish('users', function() {
		if (isAdmin(this.userId)) {
			return Meteor.users.find();
		} else {
			return Meteor.users.find({
				_id: this.userId
			});
		}
	});
}

if (Meteor.isClient) {
	Meteor.subscribe('users');
}
