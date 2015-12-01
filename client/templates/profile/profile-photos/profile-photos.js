Template.profilePhotos.onRendered(function() {
	// console.log('current user:',Meteor.user());

	// Meteor.loginWithPassword('test3@petpal.com', 'omidomid', function (error) {
	// 	if (error) {
	// 		console.log('error loggin in!');
	// 	} else {
	// 		console.log('login success!', Meteor.user());
	// 	}
	// });
});

Template.profilePhotos.helpers({
	user: function() {
		return Meteor.user();
	},
	profile: function() {
		return Meteor.user().profile;
	},
	pet: function() {
		var pet = Pets.findOne();
		Template.instance().pet = pet;
		return pet;
	},
});

Template.profilePhotos.events({
	'change input[type="file"]': function(e, template) {
		console.log(template);
		var target = e.currentTarget;
		var profileFolders = Meteor.settings.public.cloudinary.folders.profile;
		var folder = $(target).hasClass('pet-photo') ? profileFolders.pet : profileFolders.owner;

		Cloudinary.upload(target.files, {
				folder: folder
			},
			function(error, res) {
				if (error) {
					console.log('error:', error);
					alert('error uploading photo');
					return false;
				}
				console.log('user:', Meteor.user());
				var public_id = res.public_id;
				var _id = Meteor.user()._id;

				if (folder === profileFolders.pet) {
					Meteor.call('Pets.updateProfilePic', {
						petId: template.pet._id,
						photo: public_id
					});

				} else {
					Meteor.call('Users.updateProfilePic', {
						photo: public_id
					})
				}

				console.log('Upload Result:', res);
			});
	}
});
