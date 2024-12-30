const express = require("express");
const router = express.Router();
const pemasukanHandler = require("../models/pemasukanHandler");

router.post("/", pemasukanHandler.createPemasukan);
router.get("/", pemasukanHandler.getPemasukan);
router.put("/:id", pemasukanHandler.updatePemasukan);
router.delete("/:id", pemasukanHandler.deletePemasukan);

module.exports = router;
