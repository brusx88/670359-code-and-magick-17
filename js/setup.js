'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var surnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Топольницкая',
  'Нионго',
  'Онопко',
  'Ирвинг'
];
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

function rand(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

var wizards = [];

for (var i = 0; i < 4; i++) {
  wizards.push({
    name: names[rand(0, names.length - 1)] + ' ' + surnames[rand(0, surnames.length - 1)],
    coatColor: coatColors[rand(0, coatColors.length - 1)],
    eyesColor: eyesColors[rand(0, eyesColors.length - 1)]
  });
}

function renderWizards() {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards[k].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[k].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[k].eyesColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var k = 0; k < wizards.length; k++) {
  fragment.appendChild(renderWizards([k]));
}

similarListElement.appendChild(fragment);
