// told the router to use layout template as the default layout for all routes
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
//adding our subscriber here instead so the iron Router knows when the route is 'ready' - meaning data to render
  waitOn: function() { return Meteor.subscriber('posts'); }
});

//defined a new route name "postlists" and mapped it to the root '/'
Router.route('/', {name: 'postsList'});

