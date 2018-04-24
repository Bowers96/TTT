'use strict';
import {
  updateGame,
  createGame,
  getGames
} from "./game/api";

import app from "./app";
window.app = app;
// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
const translateBoardToGameState = function() {
  return Array.from($('.square').map((index, value) => {
    if ($(value).hasClass('fa-times')) {
      return "x";
    }
    if ($(value).hasClass('fa-circle-o')) {
      return "o";
    } else {
      return ""
    }
  }));
};

$(document).ready(function() {
  require('./auth/events.js').addHandlers();

  let player = 1;
  let numberOfMoves = 0;


  $('.square').on('click', function(event) {


    let squareSelected = $(this);
    //
    //
    //  This generates the "difference " object that is expected by the games
    // API - Now we need to create a function to make the AJAX call to update the
    // game state on the server - but we havent done that yet
    let over = false;
    let winnerId = false;

    // This stuff controls the state of what is displayed on the users screen
    //
    //
    //
    if (squareSelected.hasClass('fa fa-times') || squareSelected.hasClass('fa fa-circle-o')) {
      $('.alert-messages').text('This square has already been selected! Please select another.');
    } else {
      if (player === 1) {
        squareSelected.addClass('fa fa-times');
        if (checkIfPlayerWon('fa fa-times')) {
          $('.alert-messages').text('Congrats! Player X has won!');
          $('.square').addClass('disabled');
          over = true;
          getGames();

        } else {
          player = 2;
          numberOfMoves += 1;
          over = false;
        }

      } else {
        squareSelected.addClass('fa fa-circle-o');
        if (checkIfPlayerWon('fa fa-circle-o')) {
          $('.alert-messages').text('Congrats! Player O has won!');
          $('.square').addClass('disabled');
          over = true;
          getGames();

        } else {
          over = false;
          player = 1;
          numberOfMoves += 1;
        }
      }

      if (numberOfMoves === 9) {
        $('.alert-messages').text('You two are good, tie game!');
        getGames();
      }
    }
    updateGame($(this).attr("data-item"), player === 1 ? "o" : "x", over, winnerId);
  });

  function checkIfPlayerWon(symbol) {
    if ($('.sq1').hasClass(symbol) && $('.sq2').hasClass(symbol) && $('.sq3').hasClass(symbol)) {
      return true;
    } else if ($('.sq4').hasClass(symbol) && $('.sq5').hasClass(symbol) && $('.sq6').hasClass(symbol)) {
      return true;
    } else if ($('.sq7').hasClass(symbol) && $('.sq8').hasClass(symbol) && $('.sq9').hasClass(symbol)) {
      return true;
    } else if ($('.sq1').hasClass(symbol) && $('.sq4').hasClass(symbol) && $('.sq7').hasClass(symbol)) {
      return true;
    } else if ($('.sq2').hasClass(symbol) && $('.sq5').hasClass(symbol) && $('.sq8').hasClass(symbol)) {
      return true;
    } else if ($('.sq3').hasClass(symbol) && $('.sq6').hasClass(symbol) && $('.sq9').hasClass(symbol)) {
      return true;
    } else if ($('.sq1').hasClass(symbol) && $('.sq5').hasClass(symbol) && $('.sq9').hasClass(symbol)) {
      return true;
    } else if ($('.sq3').hasClass(symbol) && $('.sq5').hasClass(symbol) && $('.sq7').hasClass(symbol)) {
      return true;
    } else {
      return false;
    }
  }
  //
  //
  //



  $('.reset').on('click', function(event) {
    console.log('Curently logged in user: ', app.user);
    $('.square').removeClass('fa fa-times fa-circle-o');
    $('.square').removeClass('disabled');
    $('.alert-messages').text('');
    createGame();
    player = 1;
    numberOfMoves = 0;
    $('.gameboard').show();
  });
});



$(() => {
  $('.gameboard').hide();

});
