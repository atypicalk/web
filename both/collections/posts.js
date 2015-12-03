// Define Collection
Posts = new Mongo.Collection('posts');

// Collection Helpers https://github.com/dburles/meteor-collection-helpers
Posts.helpers({

});

PostsSchema = new SimpleSchema({
  content: {
    type: String,
    min: 1,
    max: 10000
  },
  userId: {
    type: String
  },
  placeId: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date;
      } 
    }
  }
});