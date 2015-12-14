Template.PetProfile.rendered = function() {
  console.log(params);
  if (params._id) {
    console.log(params._id);
  }
  Session.set('profileUserId', params._id);
  thisPetsOwnerId = 'noIdSet';
  thisPetsOwnerProfile = [];
  thisPetsUsername = 'noUserNameSet';
  profileDataLoaded = false;
  Meteor.call('Pets.PetByOwnerId', params._id, function (error, result) {
    console.log("Getting pet data for this pet by id of the pet owners id");
    console.log(error);
    Session.set('thisPet', result);
    return true;
  });
  Meteor.call('Users.getUserById', params._id, function (error, result) {
    console.log("Getting data for user who owns this pet");
    console.log(error);
    thisPetsOwnerId = result._id;
    thisPetsOwnerUsername = result.emails[0].address;// we need to switch it to username
    thisPetsOwnerProfile = result.profile;
    Session.set('thisPetsOwnerUsername', thisPetsOwnerUsername);
    Session.set('thisPetsOwnerId', thisPetsOwnerId);
    Session.set('thisPetsOwnerProfile', thisPetsOwnerProfile);
    return true;
  });

}
Template.PetProfile.helpers({
  /**
  This helper makes availabe the pet document matching the userId from the params
  */
  thisPet: function () {
    return Session.get('thisPet');
  },// End of this pet

  /**
  This helper makes availabe the id of the owner of this pet
  */
  thisPetsOwnerId: function () {
    return Session.get('thisPetsOwnerId');
  },// End of this pets owner id

  /**
  This helper makes availabe the username of the owner of this pet
  */
  thisPetsOwnerUsername: function () {
    return Session.get('thisPetsOwnerUsername');
  }, // End of this pets owner username

  /**
  This helper makes availabe the profile of the owner of this pet
  */
  thisPetsOwnerProfile: function () {
    return Session.get('thisPetsOwnerProfile');
  }, // End of this pets owner profile
  /** this helper gets the user pic.. duh
  */
  userPic: function() {
    var userProfile = Session.get('thisPetsOwnerProfile');
    if (!userProfile) return '';
    var photo = userProfile.photo;
    if (!photo) {
      return;
    } else {
      return photo.public_id + '.png';
    }
  },
});
