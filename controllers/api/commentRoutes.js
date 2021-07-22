const router = require('express').Router();
const { Comment } = require('../../models');
const logAuth = require('../../utils/auth');

router.post('/', logAuth, async (req, res) => {
  try {
    console.log("This is the comment route.");
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.userId,
      blog_id: req.body.blogId,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;