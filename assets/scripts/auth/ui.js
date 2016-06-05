'use strict';

const app = require('./app.js');
const smallFunc = require('./smfunction');
const signInApi = require('./signInApi');

let gameId = 0;
let checkWin = smallFunc.check;

const success = (data) => {
  console.log(data);
};

const failure = (error) => {
  console.error(error);
  $('.fail-message').css("display", "block");
  $('#sign-up-email').val('');
  $('#sign-up-pw').val('');
  $('#sign-up-pw-retype').val('');
  $('#sign-in-email').val('');
  $('#sign-in-pw').val('');
};

const signInSuccess = function (data) {
  app.user = data.user;
  console.log(app);
  $('#sign-in-email').val('');
  $('#sign-in-pw').val('');
  $('.signUp').hide();
  $('.signIn').hide();
  $('.user-info').show();
  $('.user-email').text(data.user.email);
};

const successSignUp = function (data) {
  let email = data.user.email;
  let ps = $('#sign-up-pw').val();
  signInApi.signIn(email, ps)
    .done(signInSuccess)
    .fail(failure);
   $('#sign-up-email').val('');
   $('#sign-up-pw').val('');
   $('#sign-up-pw-retype').val('');
};

const successChangePassword = function (data) {
  console.log(data);
  $('#old-pw').val('');
  $('#new-pw').val('');
}

const signOutSuccess = function () {
  app.user = null;
  console.log(app);
  $('.user-info').hide();
  $('.signUp').show();
  $('.signIn').show();
  $('.fail-message').css("display", "none");
};

const createGameSuccess = function (data) {
  gameId = data.game.id;
};

const getGameSuccess = function (data) {
  //if (data.games) {
    console.table(data.games);
    let gameArr = data.games;
    let gameNumber = gameArr.length;
    let x_score_count = 0;
    let o_score_count = 0;
    let tie_score_count = 0;
    for(let i = 0; i < gameArr.length; i++) {
      if ((checkWin(gameArr[i].cells)==="Player_x win!") && (gameArr[i].over===true)) {
          x_score_count++;
      }else if ((checkWin(gameArr[i].cells)==="Player_o win!") && (gameArr[i].over===true)) {
          o_score_count++;
      }else if (gameArr[i].over===true) {
          tie_score_count++;
      }
    }
    $('#Player_x-score').text(x_score_count);
    $('#Player_o-score').text(o_score_count);
    $('#tie-score').text(tie_score_count);
    $('#game-num').text(gameNumber);
//  }
  // else {
  //   console.log(data.game);
  //   gameCell = data.game.cells;
  //   gameStatus = data.game.over;
  //   if ((checkWin(gameCell)==="Player_x win!") && (gameStatus===true)) {
  //       $('#Player_x-score').val(1);
  //   }else if ((checkWin(gameCell)==="Player_o win!") && (gameStatus===true)) {
  //       $('#Player_o-score').val(1);
  //   }else if (gameStatus===true) {
  //       $('#tie-score').val(1);
  //   }
  // }
};

const returnGameId = function () {
  return gameId;
};

module.exports = {
  failure,
  success,
  successSignUp,
  signInSuccess,
  successChangePassword,
  signOutSuccess,
  createGameSuccess,
  getGameSuccess,
  returnGameId,
};
