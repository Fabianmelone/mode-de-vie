const router = require('express').Router();
const  User  = require('../models/User');




// Define the base route, runs login check before rendering
router.get("/", (req, res) => {
    res.render("homepage");
  });
  
  // Define the login route
  router.get("/login", (req, res) => {
    res.render("login");
  });




module.exports = router;