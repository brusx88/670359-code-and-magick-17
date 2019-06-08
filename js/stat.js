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
function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

window.renderStatistics = function (ctx, names, times) {
  var SHADOW_X = CLOUD_X + GAP;
  var SHADOW_Y = CLOUD_Y + GAP;
  renderCloud(ctx, SHADOW_X, SHADOW_Y, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseLine = 'hanging';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var COORDINATE_X = CLOUD_X + TEXT_WIDTH - GAP + (COL_HEIGHT) * i;
    var COORDINATE_Y = CLOUD_X + CLOUD_X + GAP + FONT_GAP + FONT_GAP;
    var HEIGHT = -((barHeight * times[i]) / maxTime);
    var SCORE = times[i].toFixed(0);
    var SCORE_Y = COORDINATE_Y + HEIGHT - 5;
    var NAMES_Y = CLOUD_X + CLOUD_X + TEXT_WIDTH + GAP;

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, ' + randomNumber(110, 255) + ', 0.7)';
    }

    ctx.fillRect(COORDINATE_X, COORDINATE_Y, BAR_WIDTH, HEIGHT);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], COORDINATE_X, NAMES_Y);
    ctx.fillText(SCORE, COORDINATE_X, SCORE_Y);
  }
};

