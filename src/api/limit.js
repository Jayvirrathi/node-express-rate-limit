const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const limiter = rateLimit({
  windowMs: 300 * 1000,
  max: 10
});

const speedLimiter = slowDown({
  windowMs: 300 * 1000,
  delayAfter: 1,
  delayMs: 500
});

const router = express.Router();

let cachedData;
let cacheTime;
let BASE_URL = '';

router.get('/', limiter, speedLimiter, async (req, res, next) => {
  if (cacheTime && cacheTime > Date.now() - 300 * 1000) {
    return res.json(cachedData);
  }
  try {
    const data = { data: 'Hello World' };

    cachedData = data;
    cacheTime = Date.now();
    data.cacheTime = cacheTime;
    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

const apiKeys = new Map();
apiKeys.set('12345', true);

router.get(
  '/key',
  limiter,
  speedLimiter,
  (req, res, next) => {
    const apiKey = req.get('X-API-KEY');
    if (apiKeys.has(apiKey)) {
      next();
    } else {
      const error = new Error('Invalid API KEY');
      next(error);
    }
  },
  async (req, res, next) => {
    if (cacheTime && cacheTime > Date.now() - 300 * 1000) {
      return res.json(cachedData);
    }
    try {
      const data = { data: 'Hello World' };

      cachedData = data;
      cacheTime = Date.now();
      data.cacheTime = cacheTime;
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
