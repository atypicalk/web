var envSettings = Meteor.settings;

// -- Router Config --
Router.configure({
	controller: '_AppController',
	loadingTemplate: 'loading',
	// progressSpinner: false
});

// Router.plugin('loading', {
// 	loadingTemplate: 'loading'
// });

Router.plugin('dataNotFound', {
	dataNotFoundTemplate: 'notFound'
});

if (Meteor.isServer) {
	Cloudinary.config({
		cloud_name: envSettings.public.cloudinary.cloud_name,
		api_key: envSettings.cloudinary.api_key,
		api_secret: envSettings.cloudinary.api_secret
	});
}

if (Meteor.isClient) {
	$.cloudinary.config({
		cloud_name: envSettings.public.cloudinary.cloud_name,
	})
}
