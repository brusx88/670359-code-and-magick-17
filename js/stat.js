'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var COL_HEIGHT = 90;
var barHeight = CLOUD_HEIGHT - COL_HEIGHT - FONT_GAP - FONT_GAP;
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT)
};


var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var colors = ['rgba(255, 0, 0, 1)', 'rgba(94, 105, 155, 0.72)', 'rgba(83, 111, 235, 0.72)', 'rgba(83, 111, 235, 0.72)'];

for (var i = 0; i < colors.length; i++) {

}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseLine = 'hanging';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var maxTime = getMaxElement(times);


  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], CLOUD_X + TEXT_WIDTH - GAP + (COL_HEIGHT) * i, CLOUD_X + CLOUD_X + TEXT_WIDTH);
    ctx.fillStyle = colors[i];
    ctx.fillRect(CLOUD_X + TEXT_WIDTH - GAP + (COL_HEIGHT) * i, COL_HEIGHT, BAR_WIDTH, (barHeight * times[i]) / maxTime);

  }
};
