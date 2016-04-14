'use strict';

const request = require('request');
const csvParse = require('csv-parse');

const TRUEFX_API_URL = 'http://webrates.truefx.com/rates/connect.html?f=csv';
const csvParseConfig = {
  columns: ['ccyPair', 'timestamp', 'bidBig', 'bidPoints', 'offerBig',
    'offerPoints', 'high', 'low', 'open']
};

function parseCsv(csv, callback) {
  csvParse(csv, csvParseConfig, (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    callback(undefined, res);
  });
}

exports.request = (callback) => {
  request.get(TRUEFX_API_URL, (err, res, body) => {
    if (err) {
      callback(err);
      return;
    }
    parseCsv(body.trim(), callback);
  });
};
