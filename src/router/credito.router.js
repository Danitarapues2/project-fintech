const express = require('express');
const { show } = require('../controller/credito.controller');
const router = express.Router();

router.get('/credito',show)


module.exports = router;