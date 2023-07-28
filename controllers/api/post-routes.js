const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {   //gets all posts
    try {
        const allPosts = await Post.findAll({
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
        const posts = allPosts.map((post) => post.get({ plain: true })); //maps over all elements of of allPosts and serialeze them
        //serialize to make the data easier to handle/reaD
        console.log(posts);
        res.json(posts);

        // res.render('homepage', {
        //     posts,
        //     logged_in: req.session.logged_in
        // });
        console.log(req.session.logged_in);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get('/popular', async (req, res) => {   //filter all posts from most likes
    try {


        const allPosts = await Post.findAll({
            order: [
                ['likes', 'DESC']
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

        const posts = allPosts.map(post => post.get({ plain: true }));
        console.log(posts);
        res.json(posts);

        // res.render('homepage', {
        //     posts,
        //     logged_in: req.session.logged_in
        // });
        console.log(req.session.logged_in);
    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;

