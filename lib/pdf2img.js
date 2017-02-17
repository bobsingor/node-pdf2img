"use strict";

var fs = require('fs');
var path = require('path');
var execSync = require('sync-exec');
var util = require("util");

var options = {
  basedir: ''
};

var Pdf2Img = function () {
};

Pdf2Img.prototype.setOptions = function (opts) {
  options.basedir = opts.basedir || options.basedir;
};

Pdf2Img.prototype.convert = function (file) {
  return new Promise(function (resolve, reject) {
    var thumbnailCommand = this._constructThumbnailCommand(file);
    var result = execSync(thumbnailCommand);
    this._copyImages(options.basedir, file);

    result.stdout.split("\n").forEach(function (line) {
      if (line.match(/^Processing pages (.*)$/)) {
        return resolve('Proccessed pages');
      }
    });  
  }.bind(this));
};

Pdf2Img.prototype._copyImages = function (startPath, file) {
  var filter = '.png'
  var files=fs.readdirSync(startPath);
  var basename = path.basename(file, '.pdf');
  var dirname = path.dirname(file);
  var thumbDirectory = dirname + '/thumbnails';

  this._createDirectory(thumbDirectory);

  console.log(startPath + ' - start copy images');
  for(var i=0;i<files.length;i++){
      var filename=path.join(startPath,files[i]);
      var stat = fs.lstatSync(filename);

      //console.log(filename);

      if (stat.isDirectory()){
        //console.log('is directory do nothing')
      }
      else if (filename.indexOf(filter)>=0) {
        var basePng = path.basename(filename, '.png');
        fs.createReadStream(filename).pipe(fs.createWriteStream(thumbDirectory + '/' + basePng +'.png'));
        fs.unlinkSync(filename);
      }; 
  };
}

Pdf2Img.prototype._createDirectory = function (dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

Pdf2Img.prototype._constructThumbnailCommand = function (file) {
  return util.format(
    "thumbpdf --resolution 20 --noclean --makepng --nomakepdf '%s'",
    file
  );
}

module.exports = new Pdf2Img;
