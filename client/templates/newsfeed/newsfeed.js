
var mw_PostsSub = null;
Session.setDefault('itemsLimit', 10);
Meteor.startup(function () {
  Deps.autorun(function () {
    Session.set('itemsLimit', 10);
  });
  Deps.autorun(function() {
    mw_PostsSub = Meteor.subscribe('posts', Session.get('itemsLimit'));
  });
});
Meteor.subscribe('places');

Template.newsfeed.helpers({
  posts: function() {
    return Posts.find().fetch();
  },
  // If, once the subscription is ready, we have less rows than we
  // asked for, we've got all the rows in the collection.
  moreResults: function() {
    return !(Posts.find().fetch().length < Session.get('itemsLimit'));
  }
});

// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
  var threshold, target = $("#showMoreResults");
  if (!target.length) return;

  threshold = $(window).scrollTop() + $(window).height() - target.height();
  if (target.offset().top < threshold) {
    if (!target.data("visible")) {
      console.log("target became visible (inside viewable area)");
      target.data("visible", true);
      Session.set("itemsLimit", Session.get("itemsLimit") + 10);
    }
  } else {
    if (target.data("visible")) {
      console.log("target became invisible (below viewable arae)");
      target.data("visible", false);
    }
  }        
}

// run the above func every time the user scrolls
$(window).scroll(showMoreVisible);

Template.newsfeed.rendered = function() {
  // #showMoreVisible is always visible on first render, so only
  // check if we've finished loading our initial data.
  if (mw_PostsSub && mw_PostsSub.ready())
    showMoreVisible();
}

Template.newsfeed.events({
  'submit #post-form' : function(e, t) {
    e.preventDefault();
    var contentVal = $('input[name=post-content]').val();
    var currentUser = Meteor.userId();
    if (currentUser) {
      Posts.insert({content: contentVal, userId: currentUser});
    }
    return false;
  }
});
