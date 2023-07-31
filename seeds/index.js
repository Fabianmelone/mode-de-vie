const sequelize = require('../config/connection');
const seedUsers = require('./userData.json');
const seedPosts = require('./postData.json');

const {User, Post} = require('../models');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    //await seedUsers();
    const allUsers = await User.bulkCreate(seedUsers, {
        individualHooks: true,  //ensures that each hooks are created for each row being created.
        returning: true,
    });

    for (const post of seedPosts){ 
        await Post.create({
          ...post,  // uses the spread operator to copy all properties from the blog object into the new Blog entry
                  });
      }

    process.exit(0);
};

seedAll();