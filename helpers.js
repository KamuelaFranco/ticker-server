const apiKey = () => process.env.API_KEY || 'demo';

const endpointBaseUrl = secretKey => `https://www.alphavantage.co/query?apikey=${secretKey}`;

const port = () => Number(process.env.PORT) || 3000;

const price = jsonResponse => jsonResponse['Global Quote']
  && jsonResponse['Global Quote']['05. price'];

const symbolNotFound = jsonResponse => (
  jsonResponse['Global Quote']
    ? !price(jsonResponse)
    : false
);

const tickerEndpoint = (url, symbol) => `${url}&function=GLOBAL_QUOTE&symbol=${symbol}`;

const tooManyRequests = jsonResponse => Boolean(jsonResponse.Note);

module.exports = {
  apiKey,
  endpointBaseUrl,
  port,
  price,
  tickerEndpoint,
  tooManyRequests,
  symbolNotFound,
};
