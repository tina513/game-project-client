'use strict';

const app = require('./app');

const signUp = (data) => {
  return $.ajax ({
    url: app.host + '/sign-up',
    method: 'POST',
    data: data,
  });
};

const logIn = (data) => {
  return $.ajax ({
    url: app.host + '/sign-in',
    method: 'POST',
    data: data,
  });
};

const signOut = () => {
  return $.ajax ({
    url: app.host + '/sign-out/' + app.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const changePassword = (data) => {
  return $.ajax ({
    url: app.host + '/change-password/'+ app.user.id,
    method: 'PATCH',
    data: data,
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

//Math.random() > 0.5 ? success('in signUp') : failure(data);

module.exports = {
  signUp,
  logIn,
  signOut,
  changePassword,
};
