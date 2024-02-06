const express = require('express');
const { show } = require('../controller/debito.controller');
const router = express.Router();

router.get('/debito',show)


module.exports = router;