const express = require('express');
const router = express.Router();
const limit = require('./limit');

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/limit', limit);

module.exports = router;
