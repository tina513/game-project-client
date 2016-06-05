'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');
const smallFunc = require('./smfunction');

let setMoveFunc = smallFunc.setMove;
let checkWin = smallFunc.check;
let notEmpty = smallFunc.notEmptyElement;
let setRand = smallFunc.setRandom;

const onSignUp = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signUp(data)
    .done(ui.successSignUp)
    .fail(ui.failure);
 $('.game-board').unbind('click');
};

const onLogIn = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.logIn(data)
  .done(ui.signInSuccess)
  .fail(ui.failure);
  $('.game-board').unbind('click');
};

const onSignOut = function (event) {
  event.preventDefault();
  api.signOut()
    .done(ui.signOutSuccess)
    .fail(ui.failure);
  for (let i = 1; i < 10; i++) {
    $('#column'+i).text('');
  }
  document.getElementById('Player_x-message').style.display = 'none';
  document.getElementById('Player_o-message').style.display = 'none';
  document.getElementById('tie-message').style.display = 'none';
  $('.game-board').unbind("click");
  document.getElementById('get-game').style.display = 'block';
  document.getElementById('start-game').style.display = 'block';
  for (let i = 1; i < 10; i++) {
    $('#column' + i).text('');
  }
  $('#Player_x-score').val('');
  $('#Player_o-score').val('');
  $('#tie-score').val('');
  $('#game-num').text('');
};

const onChangePassword = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
  .done(ui.success)
  .fail(ui.failure);
  $('.game-board').unbind('click');
};

let arr = ['', '', '', '', '', '', '', '', ''];
let player_x_count = $('#Player_x-score').val();
let player_o_count = $('#Player_o-score').val();
let tie_count = $('#tie-score').val();
const showAndSetMove = function (event) {
  event.preventDefault();
  let id = "#" + event.target.id;
  let id_num = parseInt(id.slice(-1)) - 1;
  if ($(id).text()==="x" || $(id).text()==="o") {
      $(event).off('click');
  }else{
    $(id).text(setMoveFunc);
    arr[id_num] = $(id).text();
    let over = false;
    if (checkWin(arr)==="Player_x win!") {
      document.getElementById('Player_x-message').style.display = 'block';
      $('.game-board').unbind('click');
      player_x_count++;
      over = true;
      setRand(true);
      $('#Player_x-score').val(player_x_count);
      $('#Player_o-score').val(player_o_count);
      $('#tie-score').val(tie_count);
    }else if (checkWin(arr)==="Player_o win!") {
      document.getElementById('Player_o-message').style.display = 'block';
      $('.game-board').unbind('click');
      player_o_count++;
      over = true;
      setRand(true);
      $('#Player_x-score').val(player_x_count);
      $('#Player_o-score').val(player_o_count);
      $('#tie-score').val(tie_count);
    }else if (arr.every(notEmpty)) {
      document.getElementById('tie-message').style.display = 'block';
      $('.game-board').unbind('click');
      tie_count++;
      over = true;
      setRand(true);
      $('#Player_x-score').val(player_x_count);
      $('#Player_o-score').val(player_o_count);
      $('#tie-score').val(tie_count);
    }
    api.updateGameStatus(id_num, arr[id_num], over)
      .done(ui.success)
      .fail(ui.failure);
  }
};


const startNew = function (event) {
  event.preventDefault();
  $('#Player_x-score').val('');
  $('#Player_o-score').val('');
  $('#tie-score').val('');
  api.createGame()
    .done(ui.createGameSuccess)
    .fail(ui.failure);
  for (let i = 1; i < 10; i++) {
    $('#column' + i).text('');
   }
  document.getElementById('Player_x-message').style.display = 'none';
  document.getElementById('Player_o-message').style.display = 'none';
  document.getElementById('tie-message').style.display = 'none';
  $('.game-board').bind('click');
  arr = ['','','','','','','','',''];
  $('.game-board').on('click', showAndSetMove);
};

const getGame = function (event) {
  event.preventDefault();
  //let id = $("#game-id").val();
  api.getGameApi()
    .done(ui.getGameSuccess)
    .fail(ui.failure);
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#log-in').on('submit', onLogIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#Player_x-score').val(player_x_count);
  $('#Player_o-score').val(player_o_count);
  $('#tie-score').val(tie_count);
  $('.game-board').on('click', showAndSetMove);
  $('#start-game').on('click', startNew);
  $('#get-game').on('click', getGame);
};


module.exports = {
  addHandlers,
};
