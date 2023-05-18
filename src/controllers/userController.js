const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      await Thought.deleteMany({ username: user.username });

      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } });
      res.json({ message: 'Friend added successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
      res.json({ message: 'Friend removed successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = userController;
