const mongoose = require("mongoose");
const Role = require("../models/Role");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.create = async (req, res, next) => {
  try {
    const { name, description = "" } = req.body;
    if (!name) return res.status(400).json({ message: "name is required" });

    const role = await Role.create({ name, description });
    res.status(201).json(role);
  } catch (e) {
    next(e);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const roles = await Role.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json(roles);
  } catch (e) {
    next(e);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid id" });

    const role = await Role.findOne({ _id: id, isDeleted: false });
    if (!role) return res.status(404).json({ message: "Role not found" });

    res.json(role);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid id" });

    const role = await Role.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { name: req.body.name, description: req.body.description },
      { new: true, runValidators: true }
    );

    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (e) {
    next(e);
  }
};

exports.softDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid id" });

    const role = await Role.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json({ message: "Role soft-deleted", role });
  } catch (e) {
    next(e);
  }
};