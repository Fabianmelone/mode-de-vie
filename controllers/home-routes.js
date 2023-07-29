const router = require('express').Router();
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


// Define the base route, runs login check before rendering
router.get("/", withAuth, async (req, res) => {
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


    // top posts by views. most viewed post
    const alltopPosts = await Post.findAll({
      order: [
        ['views', 'DESC']
      ],
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
















    if (randomPost && alltopPosts) {
      const randPost = randomPost.get({ plain: true });
      const topPosts = alltopPosts.map(post => post.get({ plain: true }));

      var filteredTopPosts = [];  //an empty array
      for( let a = 0; a < 8; a++) {
        filteredTopPosts[a] = topPosts[a];  //assigns the values of topPost's  a'th index to the filteredTopPosts array. This array will store only the top 7 posts by view counts.
      }



      console.log(filteredTopPosts);

      res.render('homepage', {
        ...randPost,
        loggedIn: req.session.loggedIn
      })
      // console.log(post);
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


router.get('/loginController', async (req, res) => {
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