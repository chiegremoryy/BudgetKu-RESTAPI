const express = require("express");
const router = express.Router();
const pemasukanHandler = require("../models/pemasukanHandler");

/**
 * @swagger
 * /api/pemasukan:
 *   post:
 *     summary: Input Data Pemasukan
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jumlah:
 *                 type: string
 *               keterangan:
 *                 type: string
 *               sumber_dana:
 *                 type: string
 *             required:
 *               - jumlah
 *               - keterangan
 *               - sumber_dana
 *     responses:
 *       201:
 *         description: Pemasukan created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jumlah:
 *                   type: string
 *                 keterangan:
 *                   type: string
 *                 sumber_dana:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

router.post("/", pemasukanHandler.createPemasukan);
router.get("/", pemasukanHandler.getPemasukan);
router.put("/:id", pemasukanHandler.updatePemasukan);
router.delete("/:id", pemasukanHandler.deletePemasukan);

module.exports = router;
