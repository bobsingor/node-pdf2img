"use strict";

var fs = require('fs');
var path = require('path');
var execSync = require('sync-exec');

var options = {};

var Pdf2Img = function () {
};

Pdf2Img.prototype.setOptions = function (opts) {};

Pdf2Img.prototype.convert = function (file) {
  var thumbnailCommand = this._constructThumbnailCommand(file);
  var result = execSync(thumbnailCommand);
};

Pdf2Img.prototype._constructThumbnailCommand = function (file) {
  return util.format(
    "thumbpdf --noclean --makepng --nomakepdf '%s'",
    file
  );
}

module.exports = new Pdf2Img;
