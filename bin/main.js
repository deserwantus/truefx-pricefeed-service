#! /usr/bin/env node

'use strict';

const argv = require('minimist')(process.argv.slice(2));
const pricefeed = require('../lib/pricefeed');
const help = require('../lib/help');

if (argv.h || argv.help) {
  help.show();
  process.exit(0);
}

pricefeed.request((error, response, body) => {
  console.log(body);
});

process.exit(0);
