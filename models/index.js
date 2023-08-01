const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');
const Follower_User = require('./Follower-User');
const UserSavedPosts = require('./UserSavedPosts')


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

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})
//many-to-many relationshi0p between user and user.
// this 'user' is followed by other users
User.belongsToMany(User, { 
    as: 'Followers', //uses an alias ('as') to  the relation when we are looking for all the followers of a user. "as" is used to differentiate between the two associations (following and follower)
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


User.belongsToMany(Post, { 
    as: 'SavedPosts', // Alias for saved posts
    through: UserSavedPosts,
    foreignKey: 'user_id',
    otherKey: 'post_id'
});

module.exports = { Comment, Post, User, Follower_User, UserSavedPosts };

