if (typeof Schema === 'undefined') {
    Schema = function Schema() {}
}

Schema.PetProfile = new SimpleSchema({
	name: {
		type: String,
		optional: true
	},
	breed: {
		type: String,
		optional: true
	},
	age: {
		type: String,
		optional: true
	},
	gender: {
		type: String,
		allowedValues: ['Male', 'Female'],
		optional: true
	},
	color: {
		type: String,
		optional: true
	},
	bio: {
		type: String,
		optional: true
	},
	photo: {
		type: Object,
		optional: true
	},
	'photo.public_id': {
		type: String,
	},
	likes: {
		type: Array,
		optional: true
	},
	'likes.$': {
		type: Object
	},
	'likes.$.thing': {
		type: String
	},
	dislikes: {
		type: Array,
		optional: true
	},
	'dislikes.$': {
		type: Object
	},
	'dislikes.$.thing': {
		type: String
	}
});

Schema.Pets = new SimpleSchema({
	user_id: {
		type: String,
	},
	profile: {
		type: Schema.PetProfile
	},
	photos: {
		type: Array,
		optional: true
	},
	'photos.$': {
		type: Object
	},
	videos: {
		type: Array,
		optional: true
	},
	'videos.$': {
		type: Object
	}
})

Pets = new Mongo.Collection('pets');

Pets.helpers({

})

Pets.attachSchema(Schema.Pets)

if (Meteor.isServer) {
	Meteor.publish('pets', function() {
		return Pets.find();
		// return Pets.find({
		// 	_id: this.userId
		// });
	});
}

if (Meteor.isClient) {
	Meteor.subscribe('pets');
}
