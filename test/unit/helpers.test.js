const {
  apiKey, endpointBaseUrl, port, price, symbolNotFound, tickerEndpoint, tooManyRequests,
} = require('../../helpers');

describe('Helpers', () => {
  describe('apiKey', () => {
    it('should return an api key', () => {
      const expected = 'demo';
      const actual = apiKey();
      expect(actual).toEqual(expected);
    });
  });

  describe('endpointBaseUrl', () => {
    it('should return an endpoint base url given a secret key', () => {
      const expected = 'https://www.alphavantage.co/query?apikey=apikey';
      const actual = endpointBaseUrl('apikey');
      expect(actual).toEqual(expected);
    });
  });

  describe('port', () => {
    it('should return a port number', () => {
      const expected = 3000;
      const actual = port();
      expect(actual).toEqual(expected);
    });
  });

  describe('price', () => {
    it('should return a price from a valid JSON response containing a price value', () => {
      const jsonResponse = {
        'Global Quote': {
          '01. symbol': 'MSFT',
          '02. open': '119.0600',
          '03. high': '119.4800',
          '04. low': '118.5200',
          '05. price': '119.1900',
          '06. volume': '13350571',
          '07. latest trading day': '2019-04-02',
          '08. previous close': '119.0200',
          '09. change': '0.1700',
          '10. change percent': '0.1428%',
        },
      };
      const expected = '119.1900';
      const actual = price(jsonResponse);
      expect(actual).toEqual(expected);
    });
    it('should return undefined from a valid JSON response not containing a price value', () => {
      const jsonResponse = {
        'Global Quote': {},
      };
      const expected = undefined;
      const actual = price(jsonResponse);
      expect(actual).toEqual(expected);
    });
  });

  describe('symbolNotFound', () => {
    it('should return true if symbol not found in JSON response', () => {
      const jsonResponse = {
        'Global Quote': {},
      };
      const expected = true;
      const actual = symbolNotFound(jsonResponse);
      expect(actual).toEqual(expected);
    });
    it('should return false if symbol found in JSON response', () => {
      const jsonResponse = {
        'Global Quote': {
          '01. symbol': 'MSFT',
          '02. open': '119.0600',
          '03. high': '119.4800',
          '04. low': '118.5200',
          '05. price': '119.1900',
          '06. volume': '13350571',
          '07. latest trading day': '2019-04-02',
          '08. previous close': '119.0200',
          '09. change': '0.1700',
          '10. change percent': '0.1428%',
        },
      };
      const expected = false;
      const actual = symbolNotFound(jsonResponse);
      expect(actual).toEqual(expected);
    });
  });

  describe('tickerEndpoint', () => {
    it('should return an endpoint given a base url and ticker symbol', () => {
      const expected = 'https://www.alphavantage.co/query?apikey=secret&function=GLOBAL_QUOTE&symbol=MSFT';
      const actual = tickerEndpoint(endpointBaseUrl('secret'), 'MSFT');
      expect(actual).toEqual(expected);
    });
  });

  describe('tooManyRequests', () => {
    it('should return true if too many requests from JSON response', () => {
      const jsonResponse = {
        Note: 'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.',
      };
      const expected = true;
      const actual = tooManyRequests(jsonResponse);
      expect(actual).toEqual(expected);
    });
    it('should return false if not too many requests from JSON response', () => {
      const jsonResponse = {
        'Global Quote': {},
      };
      const expected = false;
      const actual = tooManyRequests(jsonResponse);
      expect(actual).toEqual(expected);
    });
  });
});
