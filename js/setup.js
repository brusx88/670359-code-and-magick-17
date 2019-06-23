'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setup = document.querySelector('.setup');
var setupWizard = document.querySelector('.setup-wizard');
var setupCoat = setupWizard.querySelector('.wizard-coat');
var setupEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = document.querySelector('.setup-fireball-wrap');

setupCoat.addEventListener('click', function () {
  setupCoat.style.fill = coatColors[rand(0, coatColors.length - 1)];
});

setupEyes.addEventListener('click', function () {
  setupEyes.style.fill = eyesColors[rand(0, eyesColors.length - 1)];
});

setupFireball.addEventListener('click', function () {
  setupFireball.style.background = fireBalls[rand(0, fireBalls.length - 1)];
});

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};
function openPopup() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

function closePopup() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setup.style.left = 50 + '%';
  setup.style.top = 80 + 'px';
}

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown',
    function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        closePopup();
      }
    });


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

var fireBalls = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
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

/* mousemove */

var dialogHandler = setup.querySelector('.upload');

var eventsHandler = function (evt, element) {
  evt.preventDefault();
  var dropped = false;

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();
    dropped = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY,
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (element) {
      element.style.top = (setup.offsetTop - shift.y) + 'px';
      element.style.left = (setup.offsetLeft - shift.x) + 'px';
    } else {
      evt.target.style.top = (evt.target.offsetTop - shift.y) + 'px';
      evt.target.style.left = (evt.target.offsetLeft - shift.x) + 'px';
    }

  }
  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dropped) {
      var onClickPreventDefault = function (evn) {
        evn.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

dialogHandler.addEventListener('mousedown', function (event) {
  eventsHandler(event, setup);
});

var setupArtefacts = document.querySelectorAll('.setup-artifacts-cell > img');
for (var y = 0; y < setupArtefacts.length; y++) {
  setupArtefacts[y].addEventListener('mousedown', function (event) {
    eventsHandler(event);
  });
}
