if (Meteor.isClient) {

	Template.jumbotron.onRendered(function() {

		this.$('.header-video').each(function(i, elem) {
			headerVideo = new HeaderVideo({
				element: elem,
				media: '.header-video__media',
				playTrigger: '.header-video__play-trigger',
				closeTrigger: '.header-video__close-trigger'
			});
		});
	});

	Template.jumbotron.helpers({

	});
}
