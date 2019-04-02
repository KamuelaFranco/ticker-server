const request = require('supertest');
const { app } = require('../../app');

describe('GET /price/MSFT', () => {
  it('responds with the ticker', (done) => {
    request(app).get('/price/MSFT').then((response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.body.symbol).toEqual('MSFT');
      expect(response.body.timestamp).toBeTruthy();
      expect(response.body.price).toBeTruthy();
      done();
    });
  });
});

describe('GET /price/asdf', () => {
  it('responds with 404 and an error', (done) => {
    request(app).get('/price/asdf').then((response) => {
      expect(response.statusCode).toEqual(404);
      expect(response.body.error).toEqual('Symbol not found');
      done();
    });
  });
});
