const express = require("express");
const router = express.Router();
const pengeluaranHandler = require("../models/pengeluaranHandler");

router.post("/", pengeluaranHandler.createPengeluaran);
router.get("/", pengeluaranHandler.getPengeluaran);
router.put("/:id", pengeluaranHandler.updatePengeluaran);
router.delete("/:id", pengeluaranHandler.deletePengeluaran);

module.exports = router;
