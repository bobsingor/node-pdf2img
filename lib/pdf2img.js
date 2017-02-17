"use strict";

var fs = require('fs');
var path = require('path');
var execSync = require('sync-exec');
var util = require("util");

var options = {};

var Pdf2Img = function () {
};

Pdf2Img.prototype.setOptions = function (opts) {};

Pdf2Img.prototype.convert = function (file) {
  return new Promise(function (resolve, reject) {
    var thumbnailCommand = this._constructThumbnailCommand(file);
    var result = execSync(thumbnailCommand);

    result.stdout.split("\n").forEach(function (line) {
      if (line.match(/^Processing pages (.*)$/)) {
        return resolve('Proccessed pages');
      }
    });  
  }.bind(this));
};

Pdf2Img.prototype._constructThumbnailCommand = function (file) {
  return util.format(
    "thumbpdf --noclean --makepng --nomakepdf '%s'",
    file
  );
}

module.exports = new Pdf2Img;
