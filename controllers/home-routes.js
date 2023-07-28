const router = require('express').Router();
const  User  = require('../models/User');




// Define the base route, runs login check before rendering
router.get("/", (req, res) => {
    res.render("homepage");
  });
  
  // Define the login route
  router.get("/signup", (req, res) => {
    res.render("./login/signup");
  });


router.get('/loginController', async (req, res)=> {
  try {
    res.render('./login/loginController')
  } catch (error) {
    res.json(error);
  }
})



module.exports = router;