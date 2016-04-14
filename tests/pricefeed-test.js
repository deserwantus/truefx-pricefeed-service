'use strict';
/*eslint-env mocha */
const assert = require('assert');
const sinon = require('sinon');
const request = require('request');
const pricefeed = require('../lib/pricefeed');

const FAKE_PRICE
  = `EUR/USD,1460582306550,1.12,769,1.12,783,1.12742,1.12794,1.12757
USD/JPY,1460582302540,109.,305,109.,320,109.301,109.363,109.335
GBP/USD,1460582248855,1.42,057,1.42,092,1.42015,1.42094,1.42052
EUR/GBP,1460582306577,0.79,369,0.79,387,0.79344,0.79404,0.79377
USD/CHF,1460582300578,0.96,672,0.96,702,0.96657,0.96714,0.96679
EUR/JPY,1460582302548,123.,260,123.,288,123.233,123.329,123.283
EUR/CHF,1460582306611,1.09,021,1.09,052,1.08984,1.09071,1.09010
USD/CAD,1460582305924,1.28,150,1.28,195,1.28100,1.28195,1.28167
AUD/USD,1460582281150,0.76,527,0.76,554,0.76522,0.76569,0.76541
GBP/JPY,1460582302540,155.,276,155.,332,155.257,155.385,155.311

`;

describe('pricefeed', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(request, 'get');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('yields json price feed', (done) => {
    request.get.yields(null, {}, FAKE_PRICE);

    pricefeed.request((err, res) => {
      assert.equal(res.length, 10);
      assert.deepEqual(res[0], {
        ccyPair: 'EUR/USD',
        timestamp: '1460582306550',
        bidBig: '1.12',
        bidPoints: '769',
        offerBig: '1.12',
        offerPoints: '783',
        high: '1.12742',
        low: '1.12794',
        open: '1.12757'
      });

      done();
    });
  });
});


