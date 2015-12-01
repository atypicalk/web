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
		type: Number,
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
		defaultValue: []
	},
	'likes.$': {
		type: Object
	},
	'likes.$.thing': {
		type: String
	},
	dislikes: {
		type: Array,
		defaultValue: []
	},
	'dislikes.$': {
		type: Object
	},
	'dislikes.$.thing': {
		type: String
	}
});

Schema.Pets = new SimpleSchema({
	userId: {
		type: String,
	},
	profile: {
		type: Schema.PetProfile,
		defaultValue: {}
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
});

Pets = new Mongo.Collection('pets');

Pets.helpers({

})

Pets.attachSchema(Schema.Pets);
