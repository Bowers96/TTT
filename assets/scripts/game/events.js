'use strict';

const app = require('../app');
const ui = require('./ui');
const getFormFields = require('../../../lib/get-form-fields.js');

const onGetGame = function(event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.getGame(data);
  .done(ui.getGameSuccess)
    .fail(ui.failure);
};

module.exports = {
  onGetGame
};
