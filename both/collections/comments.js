
// Define Collection
Comments = new Mongo.Collection('comments');

// Collection Helpers https://github.com/dburles/meteor-collection-helpers
Comments.helpers({

});

CommentsSchema = new SimpleSchema({
  content: {
    type: String,
    min: 1,
    max: 10000
  },
  postId: {
    type: String
  },
  userId: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      }
    }
  },
});
