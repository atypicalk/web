Template.landingDevices.onRendered(function() {

});

Template.landingDevices.helpers({
	image: {
		public_id: Meteor.settings.public.cloudinary.folders.landing + 'footer-photo.png'
	}
});

Template.landingDevices.events({
  
});
