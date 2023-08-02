const router = require('express').Router();
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');
const { Post, User, Follower_User, Comment } = require('../models');


// Define the base route, runs login check before rendering
router.get("/", withAuth, async (req, res) => {
  try {
    const randomPost = await Post.findOne({
      order: sequelize.literal('rand()'),
      include: [
        {
          model: User,
          attributes: ['username', 'profile_picture'],
        },
        {
            model: Comment,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['username', 'profile_picture'],
                },
            ],
        },
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
          attributes: ['username', 'profile_picture'],
        },

      ],
    });

    // cannot get top users because we don't have the follow implementation yet
    const allTopUsers = await User.findAll();

    if (randomPost && alltopPosts && allTopUsers) {
      const randPost = randomPost.get({ plain: true });
      const topPosts = alltopPosts.map(post => post.get({ plain: true }));
      const topUsers = allTopUsers.map(user => user.get({ plain: true }));


      var filteredTopPosts = [];  //an empty array
      for( let a = 0; a < 8; a++) {
        filteredTopPosts[a] = topPosts[a];  //assigns the values of topPost's  a'th index to the filteredTopPosts array. This array will store only the top 7 posts by view counts.
      }

      var filteredTopUsers = [];  //an empty array
      for( let a = 0; a < 8; a++) {
        filteredTopUsers[a] = topUsers[a];  //assigns the values of topPost's  a'th index to the filteredTopPosts array. This array will store only the top 7 posts by view counts.
      }

      res.render('homepage', {
        ...randPost,
        filteredTopPosts,
        filteredTopUsers,
        loggedIn: req.session.loggedIn
      })
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
    // Get the current user's ID from the session
    const loggedInUserId = req.session.user_id;

    // Find all the user IDs the current user follows in the Follower_User table
    const followingUsers = await Follower_User.findAll({
      where: { follower_id: loggedInUserId },
      attributes: ['user_id'], // Only get the user_id from the Follower_User table
    });

    // Extract the user IDs from the followingUsers array
    const followedUserIds = followingUsers.map((user) => user.user_id);

    // Fetch posts of the users the current user follows
    const followingPosts = await Post.findAll({
      where: {

        user_id: followedUserIds, // Replace with the actual user's ID or get it from the session

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
