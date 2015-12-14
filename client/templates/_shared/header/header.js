Template.header.helpers({
	isSolid: function () {
		var route = Router.current().route.getName();
		return (route !== 'landing') ? 'solid' : '';
	}
})

Template.header.events({
  "click [data-action='logout']": function (e) {
    e.preventDefault();

    // Log out of Meteor Accounts
    Meteor.logout();

    // Tell the router what page it should go to once we log out
    Router.go('/');
  }
});
Template.header.rendered = function () {
   $(".button-collapse").sideNav();
}
