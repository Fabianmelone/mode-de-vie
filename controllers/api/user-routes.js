const router = require('express');

const { User } = require('../../models/User');
//still need to add authorization method

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });    //finds a user where its username is the same as the username in the request body.

        
        
    } catch (error) {
        res.status(500).json(error);
    }
})