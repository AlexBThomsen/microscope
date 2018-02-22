// told the router to use layout template as the default layout for all routes
Router.configure({
  layoutTemplate: 'layout'
});

//defined a new route name "postlists" and mapped it to the root '/'
Router.route('/', {name: 'postsList'});

