const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Follower_User extends Model { }


//follower-user model to act as a join table to allow many to many relations between users and followers
Follower_User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
        },
        follower_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
          }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'follower_user',
    }

);

module.exports = Follower_User;