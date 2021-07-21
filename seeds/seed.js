const sequelize = require('../config/connection');
const { Blog } = require('../models');
const { User } = require('../models');
const blogData = require('./blogData.json');
const userData = require('./userData.json');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData);
    
    await Blog.bulkCreate(blogData);

  } catch (err) {
    console.log(err);
  }

  process.exit(0);
};

seedAll();