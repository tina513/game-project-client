'use strict';

const app = require('./app.js');

let gameId = 0;

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

const signOutSuccess = function () {
  app.user = null;
  console.log(app);
};

const createGameSuccess = function (data) {
  gameId = data.game.id;
  console.log(data);
};

const getGameSuccess = function (data) {
  if (data.games) {
    console.table(data.games);
  }else {
    console.log(data.game);
  }
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
