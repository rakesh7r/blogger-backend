const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  comment: { type: String, required: true },
  date: { type: Date, default: Date },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  author: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  reactions: [String],
  createdAt: { type: Date },
  updatedAt: { type: Date },
  media: [String],
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profilePicture: { type: String },
  username: { type: String, required: true, unique: true },
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Blog = mongoose.model('Blog', blogSchema);
const User = mongoose.model('User', userSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment, Blog, User };
