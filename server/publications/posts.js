Meteor.publish('posts', function(limit) {
  return Posts.find({}, { limit: limit });
});