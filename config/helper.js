const Handlebars = require("handlebars");

Handlebars.registerHelper("helper-log-posts", function (posts, options) {
  // Log the userPosts data
  console.log(posts);

  // Return the block content
  return options.fn(this);
});
