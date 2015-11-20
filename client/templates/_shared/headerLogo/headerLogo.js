Template.headerLogo.events({
  'click .header-logo': function (e) {
    // e.preventDefault();
    Router.go('/dashboard');
  }
});
