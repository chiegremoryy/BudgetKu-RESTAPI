const express = require("express");
const router = express.Router();
const pemasukanHandler = require("../models/pemasukanHandler");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/pemasukan:
 *   post:
 *     summary: Create a new pemasukan
 *     tags: [Pemasukan]
 *     security:
 *       - BearerAuth: [] # Bearer token untuk otorisasi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jumlah:
 *                 type: number
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
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     jumlah:
 *                       type: number
 *                     keterangan:
 *                       type: string
 *                     sumber_dana:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get pemasukan data
 *     tags: [Pemasukan]
 *     security:
 *       - BearerAuth: [] # Bearer token untuk otorisasi
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of records per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: keyword
 *         in: query
 *         description: Search keyword for sumber_dana
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched pemasukan data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       jumlah:
 *                         type: number
 *                       keterangan:
 *                         type: string
 *                       sumber_dana:
 *                         type: string
 *                       email:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *
 * /api/pemasukan/{id}:
 *   put:
 *     summary: Update a pemasukan
 *     tags: [Pemasukan]
 *     security:
 *       - BearerAuth: [] # Bearer token untuk otorisasi
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the pemasukan to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jumlah:
 *                 type: number
 *               keterangan:
 *                 type: string
 *               sumber_dana:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pemasukan updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request
 *       404:
 *         description: Pemasukan not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a pemasukan
 *     tags: [Pemasukan]
 *     security:
 *       - BearerAuth: [] # Bearer token untuk otorisasi
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the pemasukan to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pemasukan deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request
 *       404:
 *         description: Pemasukan not found
 *       500:
 *         description: Internal server error
 */

router.post("/", pemasukanHandler.createPemasukan);
router.get("/", pemasukanHandler.getPemasukan);
router.put("/:id", pemasukanHandler.updatePemasukan);
router.delete("/:id", pemasukanHandler.deletePemasukan);

module.exports = router;
