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
};

const signInSuccess = function (data) {
  app.user = data.user;
  console.log(app);
};

const successSignUp = function (data) {
  let email = data.user.email;
  let ps = $('#sign-up-pw').val();
 signInApi.signIn(email, ps)
   .done(signInSuccess)
   .fail(failure);
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
  successSignUp,
  signInSuccess,
  signOutSuccess,
  createGameSuccess,
  getGameSuccess,
  returnGameId,
};
