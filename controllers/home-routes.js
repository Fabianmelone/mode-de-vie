const router = require('express').Router();
const withAuth = require('../utils/auth');





// Define the base route, runs login check before rendering
router.get("/",withAuth,  (req, res) => {
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
});
router.get('/login', async (req, res) => {
  res.render('./login/login');
});




module.exports = router;