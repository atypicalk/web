Meteor.publish('posts', function(limit) {
  return Posts.find({}, {sort: {createdAt: 1},  limit: limit });
});
