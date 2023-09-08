const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
        },
        pages: {
            type: DataTypes.INTEGER,
        },
        pub_year: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT,
        },
        link: {
            type: DataTypes.STRING
        },
        age_rating: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'book',
    }
);

module.exports = Book;
