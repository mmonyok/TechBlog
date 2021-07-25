const router = require('express').Router();
const { User, Blog } = require('../models');
const Comment = require('../models/Comment');
const logAuth = require('../utils/auth');

// This route will get all blogs from every user and display them on the page.
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      order: [['date', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const blogs = await blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
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
      order: [['date', 'DESC']],
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
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/newComment/:id', logAuth, async (req, res) => {
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
      order: [['date', 'DESC']],
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
      addComment: true,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login', {
    signup: true
  });
});

module.exports = router;