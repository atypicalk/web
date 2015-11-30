// // requires package "dburles:factory"

// Meteor.startup(function() {

//   Factory.define('user', Meteor.users, {
//     emails: function() { return ['eh@eh.com']; },
//     password: function() { return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8); }
//   });
//   // Factory.define('user', User, Fake.user({
//   // 	fields: ['email',]
//   // }));

//   if (Meteor.users.find({}).count() === 0) {

//     _(10).times(function(n) {
//       Factory.create('user');
//     });

//   }

// });
