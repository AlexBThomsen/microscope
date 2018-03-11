// Event handler to take submit form
Template.postSubmit.events({
  'submit form': function(e) {
    // We need to ensure we preventDefault on the event argument to our handler 
    //to make sure the browser doesn't go ahead and try to submit the form.
    e.preventDefault();

    //This function uses jQuery to parse out the values of our various form fields, and populate a new post object from the results.
    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };


    //route to our new post page
    // insert() function on a collection returns the generated _id for the object that has been inserted into the database, which the Router's go() function will use to construct a URL for us to browse to.

    post._id = Posts.insert(post);
    Router.go('postPage', post);

    // user will submit and automatically be taken to the discussion page of that new post
  }
});