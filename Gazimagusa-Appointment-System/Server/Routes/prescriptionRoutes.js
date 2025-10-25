const express = require('express');
const router = express.Router();
const { createPrescription } = require('../Controllers/prescriptionController');

router.post('/', createPrescription);

module.exports = router;
