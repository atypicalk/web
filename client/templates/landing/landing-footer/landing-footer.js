Template.landingFooter.onCreated(function() {

});

Template.landingFooter.onRendered(function() {
	this.$('.over').css('display', 'none');
});

Template.landingFooter.helpers({

});

Template.landingFooter.events({
	'mouseenter .icon': function(e) {
		var target = $(e.target);
		target.find('.up').css('display', 'none');
		target.find('.over').css('display', 'block');
	},
	'mouseleave .icon': function(e) {
		var target = $(e.target);
		target.find('.up').css('display', 'block');
		target.find('.over').css('display', 'none');
	},
});
