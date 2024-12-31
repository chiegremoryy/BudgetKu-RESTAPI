const express = require('express');
const verifyToken = require('../middleware/verifyToken'); // Middleware untuk verifikasi token JWT
const getSaldo = require('../models/saldoHandler'); // Controller untuk total saldo
const getSaldoWeekly = require('../models/saldoWeekHandler'); // Controller untuk saldo mingguan
const { route } = require('./authRoute');

const router = express.Router();

// Endpoint GET untuk total saldo
router.get('/', verifyToken, getSaldo);

module.exports = router;
