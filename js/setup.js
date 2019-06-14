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

function renderWizards(index) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards[index].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[index].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[index].eyesColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizards(j));
}

similarListElement.appendChild(fragment);
