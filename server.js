// Import the required modules
const express = require("express");
const exphbs = require("express-handlebars");

// Create an instance of Express
const app = express();
const port = 3000; // Set the port you want the server to listen on

// Should be controlled by a Auth check function
// If true, the user will be directed to the homepage route "/"
// If false, the user will be directed to the login route "/login"
const isAuthenticated = false;

// Middleware function to check if the user is logged in
function checkLoggedIn(req, res, next) {
  // Create local variables to hide static layout elements on the login page. (navbar, sidebar, etc.)
  res.locals.showSidebar, (res.locals.showNavbar = isAuthenticated);

  if (isAuthenticated) {
    // User is logged in, proceed to the next middleware or route handler
    next();
  } else {
    // User is not logged in, redirect to the login page
    res.redirect("/login");
  }
}

// Set up the Handlebars view engine
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

// Set up the public directory to serve static files
app.use(express.static("public"));

// Define the base route, runs login check before rendering
app.get("/", checkLoggedIn, (req, res) => {
  res.render("homepage");
});

// Define the login route
app.get("/login", (req, res) => {
  res.render("login");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
