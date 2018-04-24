'use strict';

const app = require('../app');
const ui = require('./ui')
const updateGame = (index, value, over, winnerId) => {


  return $.ajax({
    url: app.host + '/games/' + app.game.id,
    method: "PATCH",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: {
      "game": {
        "cell": {
          "index": index,
          "value": value
        },
        "over": over
      }
    }
  }).then(data => app.game = data.game)
};

const createGame = function() {
  return $.ajax({
    method: "POST",
    url: app.host + "/games",
    headers: {
      Authorization: 'Token token=' + app.user.token
    }
  }).then(data => ui.newGameSuccess(data))
};


const getGames = function() {
  return $.ajax({
    method: "GET",
    url: app.host + "/games",
    headers: {
      Authorization: 'Token token=' + app.user.token
    }
  }).then(data => ui.getGamesSuccess(data))
};

module.exports = {
  updateGame,
  createGame,
  getGames
};
