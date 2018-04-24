'use strict';

const app = require('../app');
window.app = app;
const newGameSuccess = (data) => {
  // console.log('data is', data);
  app.game = data.game;

};
const getGamesSuccess = (data) => {
  let totalGamesByUser = data.games.length;

  $('.games-played').text(app.user.email + ' has played ' + totalGamesByUser + ' games');
  // window.alert(data.length);
};



module.exports = {
  newGameSuccess,
  getGamesSuccess
};
