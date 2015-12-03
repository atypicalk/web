// JY: Is this available here? shouldn't we take userId as an arg?
Meteor.publishComposite('pets', function() {
  return {
    find: function() {
      return Pets.find({userId: this.userId});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  };
});
