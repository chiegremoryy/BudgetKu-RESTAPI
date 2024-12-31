const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const getSaldo = require('../models/saldoHandler');

const router = express.Router();

// Endpoint GET untuk total saldo
router.get('/', verifyToken, getSaldo);

module.exports = router;
