const mongoose = require('mongoose');

const userSchema = {
    login: String,
    password: String,
};

const formSchema = {
  name: String,
  email: String,
  policyid: String,
  claimType: String,
  claimAmount: Number,
  dateOccurred: String,
  formStatus: String,
};

module.exports = {
  user: userSchema,
  form: formSchema,
}
