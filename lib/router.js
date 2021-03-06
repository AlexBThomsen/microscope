// told the router to use layout template as the default layout for all routes
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notfound',
//adding our subscriber here instead so the iron Router knows when the route is 'ready' - meaning data to render
  waitOn: function() { return Meteor.subscribe('posts'); }
});

//defined a new route name "postlists" and mapped it to the root '/'
Router.route('/', {name: 'postsList'});

// adding :_id meaning it will match with any id after posts/
Router.route('/posts/:_id', {
	name: 'postPage',
	//add this to get the proper data by looking for our post based on the _id 
	// everytime user access this route, find the appropiate post and pass it to the template.
	data: function() { return Posts.findOne(this.params._id); }
});

//route for our new page
Router.route('/submit', {name: 'postSubmit'});

// check if user is logged in if not direct them to accessdenied page.
var requireLogin = function() {
  if (! Meteor.user()) {
  	// we adding this to load the loadingtemplate while server and client talk to see if individual is logged in or not cause it can create problems.
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}


// telling Iron router to show the not found page also for PostPage route, whenever data function returns false
Router.onBeforeAction('dataNotFound', {only: 'postPage'});


Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
