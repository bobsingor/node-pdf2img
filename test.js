var pdf2img = require('./index.js');

var input   = __dirname + '/c01716868.pdf';

pdf2img.convert(input).then(function (data) {
  console.log(data);
}, function (error) {
  console.log(error)
})
