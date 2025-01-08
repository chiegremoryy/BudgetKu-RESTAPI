const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const getSaldoWeekly = require('../models/saldoWeekHandler'); // Handler untuk saldo mingguan

const router = express.Router();

// Endpoint untuk saldo mingguan
router.get('/', verifyToken, getSaldoWeekly);

module.exports = router;
