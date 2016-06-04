'use strict';

const app = require('./app');
const ui = require('./ui');

const signUp = (data) => {
  return $.ajax({
    url: app.host + '/sign-up',
    method: 'POST',
    data: data,
  });
};

const signIn = (email, password) => {
  return $.ajax({
    url: app.host + '/sign-in',
    method: 'POST',
    data: {
      "credentials": {
          "email": email,
          "password": password,
        },
     },
  });
};

const logIn = (data) => {
  return $.ajax({
    url: app.host + '/sign-in',
    method: 'POST',
    data: data,
  });
};

const signOut = () => {
  return $.ajax({
    url: app.host + '/sign-out/' + app.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const changePassword = (data) => {
  return $.ajax({
    url: app.host + '/change-password/' + app.user.id,
    method: 'PATCH',
    data: data,
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const createGame = () => {
  return $.ajax({
    url: app.host + '/games',
    method: 'POST',
    data: {},
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const getGameApi = () => {
  // if (id === '') {
  return $.ajax({
      url: app.host + `/games`,
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
    });

  // }else {
  //   return $.ajax ({
  //     url: app.host + `/games/`+id,
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Token token=' + app.user.token,
  //     },
  //   });
  // }
};

const updateGameStatus = (gameIndex, gameValue, gameStatus) => {
  return $.ajax({
    url: app.host + `/games/` + ui.returnGameId(),
    method: 'PATCH',
    data: {
        "game": {
          "cell": {
            "index": gameIndex,
            "value": gameValue,
          },
          "over": gameStatus,
        },
      },
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};


module.exports = {
  signUp,
  signIn,
  logIn,
  signOut,
  changePassword,
  createGame,
  getGameApi,
  updateGameStatus
};
