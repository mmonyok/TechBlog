const { Blog } = require('../models');

const blogData = [
  {
    title: 'Why MVC is so important.',
    blogBody: 
      "MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.",
    dateCreated: '7/19/21',
    creator: 'mmonyok'
  },
  {
    title: "Authentication vs. Authorization",
    blogBody: 
      "There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.",
    dateCreated: '7/15/21',
    creator: 'cmonyok'
  },
  {
    title: "This hw is very large.",
    blogBody: 
      "This hw assignment feels like a project all on its own. Not only do we have to complete a functioning front end from scratch, but we also have to write an entire functioning back-end. We will be using almost everything learned the entire course. This hw assignment should just be merged into the project only.",
      dateCreated: '7/20/21',
      creator: 'mmonyok'
  }
];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;