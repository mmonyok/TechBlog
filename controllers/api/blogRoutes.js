const router = require('express').Router();
const { Blog, User } = require('../../models');
const logAuth = require('../../utils/auth');

router.post('/', logAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userId,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/edit/:id', logAuth, async (req, res) => {
  try {
    console.log("Second attempt to update.");
    const editBlog = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id,
        }
      }
    )

    res.status(200).json(editBlog);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;