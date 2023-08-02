const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// posts/
router.get("/", withAuth, async (req, res) => {
  try {
    const randomPost = await Post.findOne({
      order: sequelize.literal("rand()"),
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              as: "user",
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    if (randomPost) {
      const post = randomPost.get({ plain: true });
      res.render("homepage", {
        ...post,
        loggedIn: req.session.loggedIn,
      });
    } else {
      res.status(404).json({ message: "No posts found" });
    }
    try {
      const userId = req.session.userID;
      const userData = await User.findByPk(userId);
      var savedPosts = await userData.getSavedPosts({});
      const savedPostsPlain = savedPosts.map((post) =>
        post.get({ plain: true })
      );
      res.json(savedPostsPlain);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/create", withAuth, async (req, res) => {
  res.render("create-post");
})

router.get("/allposts", withAuth, async (req, res) => {   //gets all posts
    try {
        const allPosts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["username"],
                        },
                    ],
                },
            ],
        });
        const posts = allPosts.map((post) => post.get({ plain: true })); //maps over all elements of of allPosts and serialeze them
        //serialize to make the data easier to handle/reaD
        res.json(posts);

        // res.render("homepage", {
        //     posts,
        //     logged_in: req.session.logged_in
        // });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/saved", withAuth, async (req, res) => {   //filter all posts from most likes
    try {

        const userId = req.session.user_id;
        const userData = await User.findByPk(userId);
        var savedPosts = await userData.getSavedPosts({});
        const savedPostsPlain = savedPosts.map(post => post.get({ plain: true }));
        res.render("saved-posts", {
            posts: savedPostsPlain,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/userposts", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [
                {
                    model: Post,
                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["username"]
                        }
                    ]
                }
            ]
        });

        const users = userData.get({ plain: true });

        res.render("homepage", {
            ...users,
            loggedIn: req.session.loggedIn
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:id", withAuth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["username", "profile_picture"],
                        },
                    ],
                },
            ],
        });
        const plainPost = post.get({ plain: true });

        res.render("single-post", {
            ...plainPost
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;

