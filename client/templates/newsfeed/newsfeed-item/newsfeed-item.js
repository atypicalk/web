Template.newsfeedItem.helpers({
  postAuthor: function() {
    return Meteor.users.findOne(this.userId);
  },
  postPlace: function() {
    return Places.findOne(this.placeId);
  }
})
