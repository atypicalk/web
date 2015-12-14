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
    thisPetsOwnerUsername = result.username;
    thisPetsOwnerProfile = result.profile;
    profileDataLoaded = true;
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
    return thisPetsOwnerId;
  },// End of this pets owner id

  /**
  This helper makes availabe the username of the owner of this pet
  */
  thisPetsOwnerUsername: function () {
    return thisPetsOwnerUsername;
  }, // End of this pets owner username

  /**
  This helper makes availabe the profile of the owner of this pet
  */
  thisPetsOwnerProfile: function () {
    return Session.get('thisPetsOwnerProfile');
  } // End of this pets owner profile
});
