'use strict';
const mongoose = require('mongoose');
const schemas = require('./modelSchemas');

mongoose.connect('mongodb://localhost/formdb');
const db = mongoose.connection;
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('connect', function() {
  console.log('Mongoose connection successful.');
});

const userSchema = mongoose.Schema(schemas.user);
const formSchema = mongoose.Schema(schemas.form);
const UserModel = mongoose.model('users', userSchema);
const FormModel = mongoose.model('forms', formSchema);

//clear collection first
UserModel.collection.remove();
FormModel.collection.remove();

const admin1 = new UserModel({ login: 'admin', password: 'pass' });
const admin2 = new UserModel({ login: 'Admin', password: 'admin' });
const admin3 = new UserModel({ login: 'admin0', password: '' });
[admin1, admin2, admin3].forEach(function(item) {
  item.save(function(err, resp) {
    if(err) {
      console.log(err);
    } else {
      console.info('user element added');
    }
  })
})

const testForm = new FormModel({
  name: 'Jan Kowalski',
  email: 'jan_kowalski@email.com',
  policyid: 'AABB-CC11-223-344',
  claimType: 'Theft',
  claimAmount: 999,
  dateOccurred: '2000-10-11',
  formStatus: '',
})

testForm.save(function(err, resp) {
  if(err) {
    console.log(err);
  } else {
    console.info('form element added');
  }
})
