const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    validPassword(pass) {
        return bcrypt.compareSync(pass, this.password);   // Check if the provided password matches the hashed password in the database
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        profile_picture: {
            type: DataTypes.STRING,
        },
        followers: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        following: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

<<<<<<< HEAD
// Find user by username
User.findByUsername = async function (username) {
    try {
        const user = await User.findOne({ where: { username } });
        return user;
    } catch (error) {
        throw new Error("Error finding user by username");
    }
};


=======
// Define a method to find a user by their username
User.findByUsername = async function (username) {
  try {
    const user = await User.findOne({ where: { username } });
    return user;
  } catch (error) {
    throw new Error('Error finding user by username');
  }
};

>>>>>>> 50e12ed6041d4e9abbc7af065623f7cbc52c2b74
module.exports = User;