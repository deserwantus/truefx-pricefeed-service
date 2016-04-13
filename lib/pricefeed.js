'use strict';

const request = require('request');
const csvParse = require('csv-parse');

const TRUEFX_API_URL = 'http://webrates.truefx.com/rates/connect.html?f=csv';
const csvParseConfig = {
  columns: ['ccyPair', 'timestamp', 'bidBig', 'bidPoints', 'offerBig',
    'offerPoints', 'high', 'low', 'open']
};

exports.request = (cb) => {
  request(TRUEFX_API_URL, (error, response, body) => {
    if (error) {
      throw (error);
    }

    console.log(body);

    csvParse(body.trim(), csvParseConfig, (err, res) => {
      if (err) { return; }
      console.log(res);
    });


  });
};
