// Define Collection
EmailCollect = new Mongo.Collection('emailCollect');

EmailCollect.allow({
	insert: function (userId, doc) {
		return true;
	}
});

// Collection Helpers https://github.com/dburles/meteor-collection-helpers
EmailCollect.helpers({

});

// Collection Hooks https://github.com/matb33/meteor-collection-hooks
EmailCollect.before.insert(function (userId, doc) {
	doc.createdAt = moment().toDate();
});
