'use strict';
//remove signIn and signOut
const app = require('../app.js');
window.app = app;
//remove me before code-along
const signInSuccess = (data) => {
  app.user = data.user;
  console.log(app);
};

//remove me before code-along
const signOutSuccess = () => {
  app.user = null;
  showSignoutMessage();
  console.log(app);
};

const changePasswordSuccess = () => {
  console.log("Password Successfully Changed.");
};

const success = (data) => {
  app.user = data.user;
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

const onGetGameByIdSuccess = (data) => {
  // console.log(data.length);
  app.games = data.games;
  let length = app.games.length;
  $("#gameOver").html(length);
  // console.log(data);
};

const showSignoutMessage = () => {
  $('.signout-message').fadeIn();

  setTimeout(function() {
    $('.signout-message').fadeOut();
  }, 5000);
};


module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  changePasswordSuccess,
  onGetGameByIdSuccess,
  showSignoutMessage
};
