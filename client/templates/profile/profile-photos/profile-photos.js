
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
	profile: function () {
		if (Meteor.user()) {
			return Meteor.user().profile;
		}
	},
});

Template.profilePhotos.events({
  'change input[type="file"]': function (e) {

  	var target = e.currentTarget;
    var profileFolders = Meteor.settings.public.cloudinary.folders.profile;
    var folder = $(target).hasClass('pet-photo') ? profileFolders.pet : profileFolders.owner;

    Cloudinary.upload(target.files, {folder: folder},
    	function (error, res) {
    		if (error) {
    			console.log('error:',error);
    			alert('error uploading photo');
    			return false;
    		}
    		console.log('user:',Meteor.user());
    		var public_id = res.public_id;
    		var _id = Meteor.user()._id;

    		if (folder === profileFolders.pet) {
    			Meteor.call('Pets.updateProfilePic', {
    				petId: Meteor.user().profile.pets[0],
    				photo: public_id
    			});

	    		// Meteor.users.update({_id: _id},{$set:{'profile.petPhoto.public_id': public_id}});
	    	} else {
	    		Meteor.users.update({_id: _id},{$set:{'profile.ownerPhoto.public_id': public_id}});
	    	}

            console.log('Upload Result:',res);
        });
  }
});
