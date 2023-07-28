const router = require('express').Router();
const  {Post, User}  = require('../../models/Post');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ]
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

