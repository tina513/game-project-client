'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');
const small_func = require('./smfunction');

let setMoveFunc = small_func.setMove;
let checkWin = small_func.check;
let notEmpty = small_func.notEmptyElement;

const onSignUp = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signUp(data)
  .done(ui.success)
  .fail(ui.failure);
};

const onLogIn = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.logIn(data)
  .done(ui.signInSuccess)
  .fail(ui.failure);
};

const onSignOut = function (event) {
  event.preventDefault();
  api.signOut()
  .done(ui.signOutSuccess)
  .fail(ui.failure);
};

const onChangePassword = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
  .done(ui.success)
  .fail(ui.failure);
};

let arr = ['','','','','','','','',''];
let Player_x_count = 0;
let Player_o_count = 0;
let tie_count = 0;

const showAndSetMove = function (event) {
  event.preventDefault();
  let id = "#" + event.target.id;
  let id_num = parseInt(id.slice(-1))-1;
  if ($(id).text()==="x" || $(id).text()==="o") {
      $(event).off('click');
  }else{
    $(id).text(setMoveFunc);
    arr[id_num] = $(id).text();
    let over = "false";
    if (checkWin(arr)==="Player_x win!") {
      document.getElementById('Player_x-message').style.display = 'block';
      $('.game-board').unbind("click");
      Player_x_count++;
      $('#Player_x-score').val(Player_x_count);
      over = "true";
    }else if (checkWin(arr)==="Player_o win!") {
      document.getElementById('Player_o-message').style.display = 'block';
      $('.game-board').unbind("click");
      Player_o_count++;
      $('#Player_o-score').val(Player_o_count);
      over = "true";
    }else if (arr.every(notEmpty)) {
      document.getElementById('tie-message').style.display = 'block';
      $('.game-board').unbind("click");
      tie_count++;
      $('#tie-score').val(tie_count);
      over = "true";
    }
    api.updateGameStatus(id_num, arr[id_num], over)
      .done(ui.success)
      .fail(ui.failure);
  }
};

const clearBoard = function (event) {
  event.preventDefault();
  api.createGame()
    .done(ui.createGameSuccess)
    .fail(ui.failure);
  for (let i = 1; i < 10; i++) {
    $('#column'+i).text("");
  }
  document.getElementById('Player_x-message').style.display = 'none';
  document.getElementById('Player_o-message').style.display = 'none';
  document.getElementById('tie-message').style.display = 'none';
  $('.game-board').bind("click");
  arr = ['','','','','','','','',''];
  $('.game-board').on('click', showAndSetMove);
};

const getGame = function (event) {
  event.preventDefault();
  let id = $("#game-id").val();
  api.getGameApi(id)
  .done(ui.getGameSuccess)
  .fail(ui.failure);
  
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#log-in').on('submit', onLogIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#Player_x-score').val(Player_x_count);
  $('#Player_o-score').val(Player_o_count);
  $('#tie-score').val(tie_count);
  $('.game-board').on('click', showAndSetMove);
  $('#play-game').on('click', clearBoard);
  $('#get-game').on('click', getGame);
};


module.exports = {
  addHandlers,
};
