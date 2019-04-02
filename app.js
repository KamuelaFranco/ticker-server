const express = require('express');
const fetch = require('node-fetch');

const {
  apiKey, endpointBaseUrl, price, symbolNotFound, tickerEndpoint, tooManyRequests,
} = require('./helpers');

const app = express();

app.get('/price/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();

  try {
    const response = await fetch(tickerEndpoint(endpointBaseUrl(apiKey()), symbol));
    const jsonResponse = await response.json();

    if (price(jsonResponse)) {
      const tickerPriceResponse = {
        symbol: symbol.toUpperCase(),
        price: price(jsonResponse),
        timestamp: String(new Date().getTime()),
      };
      res.status(200).json(tickerPriceResponse);
    } else if (symbolNotFound(jsonResponse)) {
      res.status(404).json({ error: 'Symbol not found' });
    } else if (tooManyRequests(jsonResponse)) {
      res.writeHead(429, { 'Content-Type': 'application/json', 'Retry-After': 60 });
      res.end(JSON.stringify({ error: 'Too many requests' }));
    } else { throw new Error('Request failed'); }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  app,
};
