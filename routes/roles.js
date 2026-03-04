var express = require("express");
var router = express.Router();
const roleCtrl = require("../controllers/role.controller");

router.post("/", roleCtrl.create);
router.get("/", roleCtrl.getAll);
router.get("/:id", roleCtrl.getById);
router.put("/:id", roleCtrl.update);
router.delete("/:id", roleCtrl.softDelete);

module.exports = router;