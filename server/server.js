'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const schemas = require('./modelSchemas');

mongoose.connect('mongodb://localhost/formdb', { useMongoClient: true });
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

app.post('/resolveForm', function(req, res) {
  const id = req.body.id;
  const formStatus = req.body.formStatus;
  FormModel.findOneAndUpdate({ _id: id}, {$set:{formStatus: formStatus}}, { new: true }, function(err, form) {
    if (err) throw err;
    res.send(form);
  });
});

app.post('/submitForm', function(req, res) {
  const form = req.body.form;
  FormModel.update(
    {
      name: form.name,
      email: form.email,
      policyid: form.policyid,
      claimType: form.claimType,
      claimAmount: form.claimAmount,
      dateOccurred: form.dateOccurred,
    },
    {$setOnInsert: form},
    {upsert: true},
    function(err, numAffected) {
      if (numAffected.upserted) {
        res.send({message: 'Form saved'});
      } else {
        res.send({message: 'Form already in system waiting for resolve'});
      }
    }
  );
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
