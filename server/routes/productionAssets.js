const express = require('express');
const path = require('path');

module.exports = app => {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendfile(path.resolve('client', 'build', 'index.html'));
    });
  }
};
