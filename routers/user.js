const express = require('express');
const router = express.Router();
const { User } = require('../schema');

router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  const { user } = req.body;
  const newUser = new User(user);
  try {
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/:username', async (req, res) => {
  const { user } = req.body;
  const { username } = user;
  try {
    const updatedUser = await User.findByIdAndUpdate({ username }, user);
    res.status(200).send(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete('/:username', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      username: req.params.username,
    });
    res.status(200).send(deletedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
