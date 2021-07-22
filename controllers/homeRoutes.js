const router = require('express').Router();
const { User, Blog } = require('../models');
const logAuth = require('../utils/auth');

// This route will get all blogs from every user and display them on the page.
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
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

    res.render('blog', {
      blog,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/dashboard', logAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.userId
      },
    });

    const blogs = await blogData.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/dashboard/newBlog', logAuth, (req, res) => {
  res.render('newBlog', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;