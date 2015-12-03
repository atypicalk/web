Meteor.startup(function() {

  // Create seed data for users
  var newAccounts = [];
  if (Meteor.users.find().count() === 0) {
     _(10).times(function(n) {
      var newAccount = Accounts.createUser({
        username: faker.name.findName(),
        email: faker.internet.email(),
        password: 'password'
      });
      newAccounts.push(newAccount);
    });
  }

  // Create seed data for places
  var newPlaces = [];
  Factory.define('place', Places, {
    name: function() { return Fake.sentence(); },
    location: function() { return {type:'Point', coordinates: [_.random(-180, 180), _.random(-90, 90)]}; }
  });
  if (Places.find({}).count() === 0) {
    _(10).times(function(n) {
      var newPlace = Factory.create('place');
      newPlaces.push(newPlace);
    });
  }
  
  // Create seed data for posts
  var newPosts = [];
  Factory.define('post', Posts, {
    createdAt: function() { return new Date(); },
    content: function() { return Fake.paragraph(); },
    placeId: function() { return Fake.fromArray(newPlaces)['_id']; },
    userId: function() { return Fake.fromArray(newAccounts); }
  });
  if (Posts.find().count() === 0) {
    _(100).times(function(n) {
      var newPost = Factory.create('post');
      newPosts.push(newPost)
    });
  }
});
