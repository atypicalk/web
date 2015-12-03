Meteor.startup(function() {

  // Create seed data for places
  Factory.define('place', Places, {
    name: function() { return Fake.sentence(); },
    location: function() { return {type:'Point', coordinates: [_.random(-180, 180), _.random(-90, 90)]}; }
  });

  if (Places.find({}).count() === 0) {
    _(10).times(function(n) {
      Factory.create('place');
    });
  }

  // Create seed data for posts
  Factory.define('post', Posts, {
    content: function() { return Fake.paragraph(); }
  });
  if (Posts.find().count() === 0) {
    _(10).times(function(n) {
      Factory.create('post');
    });
  }
});
