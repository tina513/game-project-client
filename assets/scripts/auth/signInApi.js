'use strict';

const app = require('./app');

const signIn = (email, password) => {
  return $.ajax({
    url: app.host + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
          email: email,
          password: password,
        },
    },
  });
};

module.exports = {
  signIn,
};
