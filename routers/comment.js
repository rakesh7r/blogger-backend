const express = require("express")
const router = express.Router()
const { Comment, Blog, User } = require("../schema")

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    res.status(200).json(comment)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
router.post("/", async (req, res) => {
  const { user, post, comment } = req.body

  try {
    const dbUser = await User.findOne({ username: user.username })
    let parent = await Blog.findById(post._id)
    let parentType = "Blog"
    if (!parent) {
      parent = await Comment.findById(post._id)
      parentType = "Comment"
    }
    const newComment = new Comment({
      comment,
      user: dbUser._id,
      username: dbUser.username,
      parentType,
      parent,
    })
    await newComment.save()
    parent.comments.push(newComment._id)
    const parentDb = await parent.save()
    res.status(200).json({ comment: newComment, parent: parentDb })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
