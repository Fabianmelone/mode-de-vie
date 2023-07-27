const Comment = require('./Comment');
const Gallery = require('./Gallery');
const Post = require('./Post');
const User = require('./User');
const Follower = require('./Follower');
const Follower_User = require('./Follower-User');

Gallery.hasMany(Post, {
    foreignKey: 'gallery_id',
});

Post.belongsTo(Gallery, {
    foreignKey: 'gallery_id',
})

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

Post.belongsTo(User, {
    foreignKey: 'user_id',
})

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
})


//many-to-many relationshi0p between user and user.
// this 'user' is followed by other users
User.belongsToMany(User, { 
    as: 'Followers', //ives an alias to  the relation when we are looking for all the followers of a user.
    through: Follower_User, //use the Follower_User model as the join table to make this many-to-many relationship.
    foreignKey: 'user_id',  //the foreign key that the Follower_User model will  use to join with the User model.
    otherKey: 'follower_id' //the foreign key that the Follower_User model will use to join with the other instance of User model (in this case, followers). 
});

// this 'user' is following other users
User.belongsToMany(User, { 
    as: 'Following', 
    through: Follower_User, 
    foreignKey: 'follower_id', 
    otherKey: 'user_id' 
});

module.exports = { Comment, Gallery, Post, User, Follower_User };