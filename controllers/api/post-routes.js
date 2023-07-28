const router = require('express').Router();
const sequelize = require('../../config/connection');
const  {Post, User}  = require('../../models');
const withAuth = require('../../utils/auth');
const filterLikes = require('../../utils/filterLikes');


// router.get('/', async (req, res) => {   //gets all posts
//     try {
//         const allPosts = await Post.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username'],
//                 }
//             ],
//         });
//         const posts = allPosts.map((post) => post.get({ plain: true })); //maps over all elements of of allPosts and serialeze them
//         //serialize to make the data easier to handle/reaD
//         console.log(posts);
//         res.json(posts);

//         // res.render('homepage', {
//         //     posts,
//         //     logged_in: req.session.logged_in
//         // });
//         console.log(req.session.logged_in);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });


router.get('/', async (req, res) => {   //filter all posts from most likes
    try {

        const topLikes = await Post.max('likes');
        const allPosts = await Post.findAll({
        });

        const posts = allPosts.map((post) => {
            filterLikes(post);
            post.get({ plain: true });
        });
        
        
        //maps over all elements of of allPosts and serialeze them
        //serialize to make the data easier to handle/reaD
        // console.log(posts);
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

