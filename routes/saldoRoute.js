const express = require('express');
const router = express.Router();
const getSaldo = require('../models/saldoHandler');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/total:
 *   get:
 *     summary: Get Total Saldo
 *     tags: [Total Saldo]
 *     security:
 *       - BearerAuth: [] # Bearer token untuk otorisasi
 *     responses:
 *       200:
 *         description: Total saldo berhasil dihitung
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Total saldo berhasil dihitung
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_pemasukan:
 *                       type: number
 *                       example: 280000
 *                     total_pengeluaran:
 *                       type: number
 *                       example: 0
 *                     total_saldo:
 *                       type: number
 *                       example: 280000
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.get('/', getSaldo);

module.exports = router;
