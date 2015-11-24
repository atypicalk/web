// cordova photo demo: https://github.com/spencercarli/meteor-cordova-photolibrary

var getPicture = function(opts) {
	MeteorCamera.getPicture(opts, function(err, data) {
		if (err) {
			console.log('error', err);
		}
		if (data) {
			Session.set('img', data)
		}
	});
};

Template.profileMobile.onRendered(function() {

});

Template.profileMobile.helpers({
	img: function() {
		return Session.get('img');
	}
});

Template.profileMobile.events({
	'click .btn-camera': function(e) {
		getPicture({
			width: 350,
			height: 350,
			quality: 75
		});

	},
	'click .btn-photolib': function() {
		if (Meteor.isCordova) {
			getPicture({
				width: 350,
				height: 350,
				quality: 75,
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY
			});
		} else {
			alert('Cordova only feature.');
		}
	}
});
