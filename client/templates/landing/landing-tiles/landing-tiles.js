Template.landingTiles.onRendered(function() {

});

Template.landingTiles.helpers({
	imgTiles: function () {
		var imgFolder = Meteor.settings.public.cloudinary.folders.landing;
		return [
			{public_id: imgFolder+'square1.jpg'},
			{public_id: imgFolder+'square2.jpg'},
			{public_id: imgFolder+'square3.jpg'},
			{public_id: imgFolder+'square4.jpg'},
			{public_id: imgFolder+'square5.jpg'},
			{public_id: imgFolder+'square6.jpg'},
		]
	}
});

Template.landingTiles.events({
  
});
