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
    console.log(randomPost);

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

    // cannot get top users because we don't have the follow implementation yet
    const allTopUsers = await User.findAll();
    const topUsers = allTopUsers.map(user => user.get({ plain: true }));
    // console.log(topUsers);
    
    if (randomPost && alltopPosts) {
      const randPost = randomPost.get({ plain: true });
      const topPosts = alltopPosts.map(post => post.get({ plain: true }));

      var filteredTopPosts = [];  //an empty array
      for( let a = 0; a < 8; a++) {
        filteredTopPosts[a] = topPosts[a];  //assigns the values of topPost's  a'th index to the filteredTopPosts array. This array will store only the top 7 posts by view counts.
      }
      // console.log(topPosts);

      console.log(randPost)
      res.render('homepage', {
        ...randPost,
        filteredTopPosts,
        loggedIn: req.session.loggedIn
      })
      // console.log(randPost);
    } else {
      // For testing error has been disabled
      res.render("homepage")
      // res.status(404).json({ message: 'No posts found' });
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

// Define the /rankings route
router.get("/rankings", withAuth, async (req, res) => {
  try {
    // Fetch posts of the people the user follows (you can replace 10 with the actual user's ID)
    const followingPosts = await Post.findAll({
      where: {
        user_id: 10, // Replace with the actual user's ID or get it from the session
      },
      order: sequelize.literal("rand()"),
      include: [{ model: User, attributes: ["username"] }],
    });

    // Fetch most liked posts
    const mostLikedPosts = await Post.findAll({
      order: [["likes", "DESC"]],
      include: [{ model: User, attributes: ["username"] }],
    });

    // Fetch most viewed posts
    const mostViewedPosts = await Post.findAll({
      order: [["views", "DESC"]],
      include: [{ model: User, attributes: ["username"] }],
    });

    // Pass the data to the rankings.handlebars template
    res.render("rankings", {
      followingPosts: followingPosts.map((post) => post.get({ plain: true })),
      mostLikedPosts: mostLikedPosts.map((post) => post.get({ plain: true })),
      mostViewedPosts: mostViewedPosts.map((post) => post.get({ plain: true })),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/followingpage", withAuth, async (req, res) => {
  res.render("followingpage");
})

module.exports = router;
