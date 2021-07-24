const router = require('express').Router();
const { User, Blog } = require('../models');
const Comment = require('../models/Comment');
const logAuth = require('../utils/auth');

// This route will load the user dashboard.
router.get('/', logAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.userId
      },
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const blogs = await blogData.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      username: req.session.username,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newBlog', logAuth, (req, res) => {
  res.render('newBlog', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id.' });
      return;
  }

    const blog = await blogData.get({ plain: true });

    const commentData = await Comment.findAll({
      where: {
        blog_id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const comments = await commentData.map((comment) => comment.get({ plain: true }));

    res.render('blog', {
      blog,
      comments,
      dashboard: true,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/edit/:id', logAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    console.log(blogData);

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id.' });
      return;
  }

  const blog = await blogData.get({ plain: true });
  res.render('editBlog', { blog });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;