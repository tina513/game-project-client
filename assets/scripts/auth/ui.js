'use strict';

const app = require('./app.js');
const small_func = require('./smfunction');
const api = require('./api');

let gameId = 0;
let gameCell = [];
let gameStatus = null;
let checkWin = small_func.check;

const success = (data) => {
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

//need to work on
const successSignUp = function (data) {
 //let email = $('#sign-in-email').val($('#sign-up-email').val());
 //let ps = $('#sign-in-pw').val($('#sign-up-pw').val());
 api.signIn(data.credentials.email, data.credentials.password)
   .done(ui.signInSuccess)
   .fail(ui.failure)
}

const signInSuccess = function (data) {
  app.user = data.user;
  console.log(app);
};

const signOutSuccess = function () {
  app.user = null;
  console.log(app);
};

const createGameSuccess = function (data) {
  gameId = data.game.id;
};

const getGameSuccess = function (data) {
  //if (data.games) {
    console.table(data.games);
    let gameArr = data.games;
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
    $('#Player_x-score').val(x_score_count);
    $('#Player_o-score').val(o_score_count);
    $('#tie-score').val(tie_score_count);
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
  signInSuccess,
  signOutSuccess,
  createGameSuccess,
  getGameSuccess,
  returnGameId,
};
