const sequelize = require('../config/connection');
const { User, Book, Post } = require('../models');
const bookData = require('./bookData.json');
const postData = require('./postData.json');

const userData = require('./userData.json');
const postData = require('./postData.json');
const bookData = require('./bookData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Book.bulkCreate(bookData)
  await Post.bulkCreate(postData)

  process.exit(0);
};

seedDatabase();
