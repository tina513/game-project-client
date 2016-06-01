'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');

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

let random = true;
const setMove = function () {
  let move = '';
  if(random) {
      move = 'x';
      random = false;
      return move;
  }else {
    move = 'o';
    random = true;
    return move;
  }
}

const showMove = function () {
  $(this).text(setMove);
}


const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#log-in').on('submit', onLogIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#column1').on('click', showMove);
  $('#column2').on('click', showMove);
  $('#column3').on('click', showMove);
  $('#column4').on('click', showMove);
  $('#column5').on('click', showMove);
  $('#column6').on('click', showMove);
  $('#column7').on('click', showMove);
  $('#column8').on('click', showMove);
  $('#column9').on('click', showMove);
};

const setArr = function () {
  
  $('#column1').val();
}

module.exports = {
  addHandlers,
};
