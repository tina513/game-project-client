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
  if (data.credentials.password === data.credentials.password_confirmation) {
    api.signUp(data)
      .done(ui.successSignUp)
      .fail(ui.failure);
   $('.game-board').unbind('click');
 }else if(data.credentials.password !== data.credentials.password_confirmation) {
   $('.retype-error').css("display", "block");
 }
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
  document.getElementById('player_x-message').style.display = 'none';
  document.getElementById('player_o-message').style.display = 'none';
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
  .done(ui.successChangePassword)
  .fail(ui.failure);
  $('.game-board').unbind('click');
};

let arr = ['', '', '', '', '', '', '', '', ''];
let player_x_count = $('#Player_x-score').text();
let player_o_count = $('#Player_o-score').text();
let tie_count = $('#tie-score').text();
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
      document.getElementById('player_x-message').style.display = 'block';
      $('.game-board').unbind('click');
      player_x_count++;
      over = true;
      setRand(true);
      $('#Player_x-score').text(player_x_count);
      $('#Player_o-score').text(player_o_count);
      $('#tie-score').text(tie_count);
    }else if (checkWin(arr)==="Player_o win!") {
      document.getElementById('player_o-message').style.display = 'block';
      $('.game-board').unbind('click');
      player_o_count++;
      over = true;
      setRand(true);
      $('#Player_x-score').text(player_x_count);
      $('#Player_o-score').text(player_o_count);
      $('#tie-score').text(tie_count);
    }else if (arr.every(notEmpty)) {
      document.getElementById('tie-message').style.display = 'block';
      $('.game-board').unbind('click');
      tie_count++;
      over = true;
      setRand(true);
      $('#Player_x-score').text(player_x_count);
      $('#Player_o-score').text(player_o_count);
      $('#tie-score').text(tie_count);
    }
    api.updateGameStatus(id_num, arr[id_num], over)
      .done(ui.success)
      .fail(ui.failure);
  }
};

let array = ['', '', '', '', '', '', '', '', ''];
let neighbour = {
    0:[1,3,4],
    1:[0,2,3,4,5],
    2:[1,4,5],
    3:[0,1,4,6,7],
    4:[0,1,2,3,5,6,7,8],
    5:[1,2,4,7,8],
    6:[3,4,7],
    7:[3,4,5,6,8],
    8:[4,5,7]
};
let player_x_counts = $('#Player_x-score').text();
let player_o_counts = $('#Player_o-score').text();
let tie_counts = $('#tie-score').text();
const showAndSetMove2 = function (event) {
  event.preventDefault();
  let id = "#" + event.target.id;
  let id_num = parseInt(id.slice(-1)) - 1;
  if ($(id).text()==="x" || $(id).text()==="o") {
      $(event).off('click');
  }else{
    $(id).text("x");
    array[id_num] = $(id).text();
    let over = false;

    if ((checkWin(array)==="Player_x win!")&&(!over)) {
      document.getElementById('player_x-message').style.display = 'block';
      $('.game-board').unbind('click');
      player_x_counts++;
      over = true;
      $('#Player_x-score').text(player_x_counts);
      $('#Player_o-score').text(player_o_counts);
      $('#tie-score').text(tie_counts);
    }else if ((checkWin(array)==="Player_o win!")&&(!over)) {
      document.getElementById('player_o-message').style.display = 'block';
      $('.game-board').unbind('click');
      player_o_counts++;
      over = true;
      $('#Player_x-score').text(player_x_counts);
      $('#Player_o-score').text(player_o_counts);
      $('#tie-score').text(tie_counts);
    }else if (array.every(notEmpty)&&(!over)) {
      document.getElementById('tie-message').style.display = 'block';
      $('.game-board').unbind('click');
      tie_counts++;
      over = true;
      $('#Player_x-score').text(player_x_counts);
      $('#Player_o-score').text(player_o_counts);
      $('#tie-score').text(tie_counts);
    }

    for (let prop in neighbour) {
      if (parseInt(prop) === id_num) {
        let nbArr = neighbour[prop];
        for (let i = 0; i < nbArr.length; i++) {
          if (($('#column'+(nbArr[i]+1)).text()!=="x")&&($('#column'+(nbArr[i]+1)).text()!=="o")) {
            $('#column'+(nbArr[i]+1)).text("o");
            array[nbArr[i]] = $('#column'+(nbArr[i]+1)).text();
            break;
          }
        }
      }
    }

    if ((checkWin(array)==="Player_x win!")&&(!over)) {
      document.getElementById('player_x-message').style.display = 'block';
      $('.game-board').unbind('click');
      player_x_counts++;
      over = true;
      $('#Player_x-score').text(player_x_counts);
      $('#Player_o-score').text(player_o_counts);
      $('#tie-score').text(tie_counts);
    }else if ((checkWin(array)==="Player_o win!")&&(!over)) {
      document.getElementById('player_o-message').style.display = 'block';
      $('.game-board').unbind('click');
      player_o_counts++;
      over = true;
      $('#Player_x-score').text(player_x_counts);
      $('#Player_o-score').text(player_o_counts);
      $('#tie-score').text(tie_counts);
    }else if (array.every(notEmpty)&&(!over)) {
      document.getElementById('tie-message').style.display = 'block';
      $('.game-board').unbind('click');
      tie_counts++;
      over = true;
      $('#Player_x-score').text(player_x_counts);
      $('#Player_o-score').text(player_o_counts);
      $('#tie-score').text(tie_counts);
    }

    api.updateGameStatus(id_num, array[id_num], over)
      .done(ui.success)
      .fail(ui.failure);
  }
};

const startNew = function (event) {
  event.preventDefault();
  $('.game-board').bind('click');
  $('#Player_x-score').text('');
  $('#Player_o-score').text('');
  $('#tie-score').text('');
  for (let i = 1; i < 10; i++) {
    $('#column' + i).text('');
   }
  document.getElementById('player_x-message').style.display = 'none';
  document.getElementById('player_o-message').style.display = 'none';
  document.getElementById('tie-message').style.display = 'none';
  api.createGame()
    .done(ui.createGameSuccess)
    .fail(ui.failure);
  arr = ['','','','','','','','',''];
  $('.game-board').on('click', showAndSetMove);
};

const playComputer = function (event) {
   event.preventDefault();
   $('.game-board').bind('click');
   $('#Player_x-score').text('');
   $('#Player_o-score').text('');
   $('#tie-score').text('');
   for (let i = 1; i < 10; i++) {
      $('#column' + i).text('');
   }
   document.getElementById('player_x-message').style.display = 'none';
   document.getElementById('player_o-message').style.display = 'none';
   document.getElementById('tie-message').style.display = 'none';
   api.createGame()
     .done(ui.createGameSuccess)
     .fail(ui.failure);
   array = ['','','','','','','','',''];
   $('.game-board').on('click', showAndSetMove2);
};



const getGame = function (event) {
  event.preventDefault();
  //let id = $("#game-id").val();
  api.getGameApi()
    .done(ui.getGameSuccess)
    .fail(ui.failure);
};

const addHandlers = () => {
  $('.user-info').hide();
  $('#sign-up').on('submit', onSignUp);
  $('#log-in').on('submit', onLogIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#Player_x-score').text(player_x_count);
  $('#Player_o-score').text(player_o_count);
  $('#tie-score').text(tie_count);
  //$('.game-board').on('click', showAndSetMove);
  $('#start-game').on('click', startNew);
  $('#get-game').on('click', getGame);
  $('#computer-game').on('click', playComputer);
};


module.exports = {
  addHandlers,
};
