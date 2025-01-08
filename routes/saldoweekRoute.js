const express = require('express');
const router = express.Router();
const getSaldoWeekly = require('../models/saldoWeekHandler');

/**
 * @swagger
 * /api/weekly:
 *   get:
 *     summary: Get weekly saldo
 *     tags: [Weekly Saldo]
 *     security:
 *       - BearerAuth: [] # Bearer token untuk otorisasi
 *     responses:
 *       200:
 *         description: Weekly saldo fetched successfully
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
 *                   example: Weekly saldo fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       week_start:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-01"
 *                       week_end:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-07"
 *                       total_pemasukan:
 *                         type: number
 *                         example: 150000
 *                       total_pengeluaran:
 *                         type: number
 *                         example: 50000
 *                       saldo:
 *                         type: number
 *                         example: 100000
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.get('/', getSaldoWeekly);

module.exports = router;
