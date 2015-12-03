// Define Collection
Posts = new Mongo.Collection('posts');

// Collection Helpers https://github.com/dburles/meteor-collection-helpers
Posts.helpers({

});

PostsSchema = new SimpleSchema({
    content: {
        type: String,
    }
});