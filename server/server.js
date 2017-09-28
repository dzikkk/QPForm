'use strict';
// const db = require('./mongo.js');
const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/formdb');
const db = mongoose.connection;
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('connect', function() {
  console.log('Mongoose connection successful.');
});

const userSchema = mongoose.Schema({
    login: String,
    password: String,
});

userSchema.method.checkLogin = function (user, password) {
  return user === this.user && password === this.password;
}

const UserModel = mongoose.model('users', userSchema);

// ADD ADMIN USER TO DB

const admin = new UserModel({ login: 'admin', password: 'pass' });
admin.save(function(err, resp) {
  if(err) {
      console.log(err);
  } else {
      console.info('%d potatoes were successfully stored.',resp);
  }
})

const formSchema = mongoose.Schema({
  name: String,
  email: String,
  policyid: String,
  claimType: String,
  claimAmount: Number,
  dateOccurred: String,
});

const FormModel = mongoose.model('forms', formSchema);

app.get('/', function(req, res) {
  res.send('SIEMA');
});

app.get('/init', function(req, res) {
  FormModel.find({}, function(err, forms) {
    console.log(forms);
    res.send(forms);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
