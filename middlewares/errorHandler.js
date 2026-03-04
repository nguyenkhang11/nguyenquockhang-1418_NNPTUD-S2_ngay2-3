module.exports = function errorHandler(err, req, res, next) {
  if (err && err.code === 11000) {
    const fields = Object.keys(err.keyPattern || err.keyValue || {});
    return res.status(409).json({ message: "Duplicate value", fields });
  }

  if (err && err.name === "ValidationError") {
    return res.status(400).json({ message: "Validation error", errors: err.errors });
  }

  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
};