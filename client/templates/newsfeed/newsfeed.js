
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

Template.newsfeed.onCreated( function() {
  this.currentPostType = new ReactiveVar("postFormBark");
});

Template.newsfeed.helpers({
  posts: function() {
    return Posts.find({}, {sort: {createdAt:-1}});
  },
  // If, once the subscription is ready, we have less rows than we
  // asked for, we've got all the rows in the collection.
  moreResults: function() {
    return !(Posts.find().fetch().length < Session.get('itemsLimit'));
  },
  postFormType: function() {
    return Template.instance().currentPostType.get();
  },
  templateNameForType: function(type) {
    console.log(type);
    if (type == 'Bark') {
      return 'newsfeedItem';
    } else if (type == 'Product') {
      return 'newsfeedItem';
    } else {
      return '';
    }
  }
});

Template.newsfeed.rendered = function() {
  // #showMoreVisible is always visible on first render, so only
  // check if we've finished loading our initial data.
  if (mw_PostsSub && mw_PostsSub.ready()) {
    showMoreVisible();
  }
}

Template.newsfeed.events({
  'click #post-bark-button' : function(e, t) {
    e.preventDefault();
    var $content = $('textarea[name=post-content]');
    if ($content.length) {
      var contentVal = $content.val();
      if (!contentVal) {
        alert('Enter Content');
        return;
      }
      var currentUserId = Meteor.userId();
      if (currentUserId) {
        Posts.insert({content: contentVal, userId: currentUserId});
      }
      $content.val('');
    }
    return false;
  },

  'click input[name=content-type]:radio' : function(e, t) {
    var currentPostType = $( event.target ).closest( "input" );
    currentPostType.addClass( "active" );
    // $(".nav-pills li").not(currentPostType).removeClass( "active" );
    t.currentPostType.set(currentPostType.data("template"));
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
