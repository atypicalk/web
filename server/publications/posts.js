Meteor.publish('posts', function(limit) {
  return Posts.find({}, {sort: {createdAt: -1},  limit: limit });
});

Meteor.publish('postComments', function(postId) {
    return Comments.find({postId: postId});
});
