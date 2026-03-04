var express = require("express");
var router = express.Router();
const userCtrl = require("../controllers/user.controller");

// IMPORTANT: enable/disable đặt trước /:id
router.post("/enable", userCtrl.enable);
router.post("/disable", userCtrl.disable);

router.post("/", userCtrl.create);
router.get("/", userCtrl.getAll);
router.get("/:id", userCtrl.getById);
router.put("/:id", userCtrl.update);
router.delete("/:id", userCtrl.softDelete);

module.exports = router;