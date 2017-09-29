'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const schemas = require('./modelSchemas');

mongoose.connect('mongodb://localhost/formdb');
const db = mongoose.connection;
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('connect', function() {
  console.log('Mongoose connection successful.');
});

const UserModel = mongoose.model('users', mongoose.Schema(schemas.user));
const FormModel = mongoose.model('forms', mongoose.Schema(schemas.form));

app.use(bodyParser.json());
app.get('/init', function(req, res) {
  FormModel.find({}, function(err, forms) {
    console.log(forms);
    res.send(forms);
  });
});

app.post('/login', function(req, res) {
  const login = req.body.login;
  const password = req.body.password;
  UserModel.find({ login: login, password: password }).exec(function(err, users) {
    if (err) throw err;
    res.send(users.length > 0);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
