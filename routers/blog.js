const express = require('express');
const router = express.Router();
const { Blog, User } = require('../schema');

router.get('/', async (req, res) => {
  const { page, limit } = req.query;
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  try {
    const totalPosts = await Blog.countDocuments();
    const totalPages = Math.ceil(totalPosts / limitNumber);

    const posts = await Blog.find().skip(skip).limit(limitNumber).exec();

    res.status(200).json({
      page: pageNumber,
      limit: limitNumber,
      totalPages: totalPages,
      totalPosts: totalPosts,
      posts: posts,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  const {
    blog,
    user: { username },
  } = req.body;
  const newBlog = new Blog(blog);
  try {
    const user = await User.findOne({ username });
    newBlog.authorId = user._id;
    newBlog.author = username;
    newBlog.createdAt = new Date().toLocaleString();
    newBlog.updatedAt = new Date().toLocaleString();
    await newBlog.save();
    if (user?.blogs) user.blogs.push(newBlog._id);
    else user.blogs = [newBlog._id];
    await user.save();
    res.status(200).send(newBlog);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put('/:id', async (req, res) => {
  const { blog } = req.body;
  try {
    blog.updatedAt = new Date().toLocaleString();
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog);
    res.status(200).send(updatedBlog);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedBlog);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
