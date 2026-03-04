const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Role = require("../models/Role");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.create = async (req, res, next) => {
  try {
    const { username, password, email, fullName = "", avatarUrl, role } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "username, password, email are required" });
    }

    if (role) {
      if (!isValidId(role)) return res.status(400).json({ message: "Invalid role id" });
      const roleExists = await Role.findOne({ _id: role, isDeleted: false });
      if (!roleExists) return res.status(400).json({ message: "Role not found" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashed,
      email,
      fullName,
      avatarUrl: avatarUrl ?? undefined,
      role: role ?? undefined
    });

    const obj = user.toObject();
    delete obj.password;
    res.status(201).json(obj);
  } catch (e) {
    next(e);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find({ isDeleted: false })
      .populate("role")
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (e) {
    next(e);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid id" });

    const user = await User.findOne({ _id: id, isDeleted: false })
      .populate("role")
      .select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid id" });

    const update = {};
    const allowed = ["username", "email", "fullName", "avatarUrl", "status", "role", "loginCount", "password"];
    for (const k of allowed) {
      if (req.body[k] !== undefined) update[k] = req.body[k];
    }

    if (update.loginCount !== undefined && update.loginCount < 0) {
      return res.status(400).json({ message: "loginCount must be >= 0" });
    }

    if (update.role) {
      if (!isValidId(update.role)) return res.status(400).json({ message: "Invalid role id" });
      const roleExists = await Role.findOne({ _id: update.role, isDeleted: false });
      if (!roleExists) return res.status(400).json({ message: "Role not found" });
    }

    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }

    const user = await User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      update,
      { new: true, runValidators: true }
    )
      .populate("role")
      .select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (e) {
    next(e);
  }
};

exports.softDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid id" });

    const user = await User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User soft-deleted", user });
  } catch (e) {
    next(e);
  }
};

// POST /users/enable {email, username} -> status true
exports.enable = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    if (!email || !username) return res.status(400).json({ message: "email and username are required" });

    const user = await User.findOneAndUpdate(
      { email, username, isDeleted: false },
      { status: true },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found with email + username" });
    res.json({ message: "User enabled", user });
  } catch (e) {
    next(e);
  }
};

// POST /users/disable {email, username} -> status false
exports.disable = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    if (!email || !username) return res.status(400).json({ message: "email and username are required" });

    const user = await User.findOneAndUpdate(
      { email, username, isDeleted: false },
      { status: false },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found with email + username" });
    res.json({ message: "User disabled", user });
  } catch (e) {
    next(e);
  }
};