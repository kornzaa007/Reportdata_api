var buffer = require('buffer');
var path = require('path');
var fs = require('fs');

export class Image {
  encode_base64(filename) {
    fs.readFile(filename, function (error, data) {
      if (error) {
        throw error;
      } else {
        var buf = Buffer.from(data);
        var base64 = buf.toString('base64');
        //console.log('Base64 of ddr.jpg :' + base64);
        return base64;
      }
    });
  }

  decode_base64(base64str, filePath) {

    var buf = Buffer.from(base64str, 'base64');

    fs.writeFileSync(filePath, buf, function (error) {
      if (error) {
        throw error;
      } else {
        console.log('File created from base64 string!');
        return true;
      }
    });

  }
}