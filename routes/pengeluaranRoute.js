const express = require("express");
const router = express.Router();
const pengeluaranHandler = require("../models/pengeluaranHandler");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/pengeluaran:
 *   post:
 *     summary: Create a new pengeluaran
 *     tags: [Pengeluaran]
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
 *               keperluan:
 *                 type: string
 *             required:
 *               - jumlah
 *               - keterangan
 *               - sumber_dana
 *               - keperluan
 *     responses:
 *       201:
 *         description: Pengeluaran created successfully
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
 *     summary: Get pengeluaran data
 *     tags: [Pengeluaran]
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
 *         description: Successfully fetched pengeluaran data
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
 * /api/pengeluaran/{id}:
 *   put:
 *     summary: Update a pengeluaran
 *     tags: [Pengeluaran]
 *     security:
 *       - BearerAuth: [] # Bearer token untuk otorisasi
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the pengeluaran to update
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
 *         description: Pengeluaran updated successfully
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
 *         description: Pengeluaran not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a pengeluaran
 *     tags: [Pengeluaran]
 *     security:
 *       - BearerAuth: [] # Bearer token untuk otorisasi
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the pengeluaran to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pengeluaran deleted successfully
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
 *         description: Pengeluaran not found
 *       500:
 *         description: Internal server error
 */

router.post("/", pengeluaranHandler.createPengeluaran);
router.get("/", pengeluaranHandler.getPengeluaran);
router.put("/:id", pengeluaranHandler.updatePengeluaran);
router.delete("/:id", pengeluaranHandler.deletePengeluaran);

module.exports = router;
