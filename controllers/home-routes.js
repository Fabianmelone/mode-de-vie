const router = require('express').Router();
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


// Define the base route, runs login check before rendering
router.get("/", withAuth,  async (req, res) => {
  try {
    const randomPost = await Post.findOne({
        order: sequelize.literal('rand()'),
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            // {
            //     model: Comment,
            //     include: [
            //         {
            //             model: User,
            //             as: 'user',
            //             attributes: ['username'],
            //         },
            //     ],
            // },
        ],
    });

    if(randomPost) {
        const post = randomPost.get({ plain: true });
        res.render('homepage', {
            ...post,
            loggedIn: req.session.loggedIn
        })
        console.log(post);
    } else {
        res.status(404).json({ message: 'No posts found' });
    }

} catch (error) {
    res.status(500).json(error);
}
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