const ffmpeg = require("fluent-ffmpeg");

exports.convertImage = function (imagePath, outputName) {
  ffmpeg().input(imagePath).saveToFile(outputNamez);
};
