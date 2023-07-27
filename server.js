// Import the required modules
const express = require("express");
const exphbs = require("express-handlebars");

const path = require('path');
const routes = require('./controllers');  //imports the routes from the ./controllers

const sequelize = require('./config/connection'); //imports a instance of sequelize that connection.js sets up and exports, and is connected to the database




// Create an instance of Express
const app = express();
const port = 3000; // Set the port you want the server to listen on

// Should be controlled by a Auth check function
// If true, the user will be directed to the homepage route "/"
// If false, the user will be directed to the login route "/login"
const isAuthenticated = true;

// Middleware function to check if the user is logged in
function checkLoggedIn(req, res, next) {
  // Create local variables to hide static layout elements on the login page. (navbar, sidebar, etc.)
  res.locals.showNavbar = isAuthenticated;
  res.locals.showSidebar = isAuthenticated;

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
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));    //middleware to allow bootstrap to be accessible to public





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
