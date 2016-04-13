'use strict';
const fs = require('fs');

exports.show = function () {
  fs.readFile('./lib/help.txt', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
  });
};
