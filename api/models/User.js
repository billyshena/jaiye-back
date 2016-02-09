/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    facebookID: {
      type: 'string'
    },

    firstName: {
      type: 'string',
      maxLength: 60,
      minLength: 2,
      required: true
    },

    lastName: {
      type: 'string',
      maxLength: 60,
      minLength: 2,
      required: true
    },

    email: {
      type: 'email',
      unique: true
    },

    password: {
      type: 'string'
    },

    description: {
      type: 'text'
    },

    active: {
      type: 'boolean',
      defaultsTo: true
    },

    /* This person's birthday in the format MM/DD/YYYY. */
    birthday: {
      type: 'datetime'
    },

    gender: {
      type: 'string'
    },

    timezone: {
      type: 'integer'
    },

    locale: {
      type: 'string'
    },

    location: {
      type: 'string'
    },

    phone: {
      type: 'string',
      minLength: 10
    },

    avatar: {
      type: 'string'
    },

    cover: {
      type: 'string'
    }
  },

  // Before User.js is created, hash the password
  beforeCreate: function (values, next) {

    // Using node bcrypt module to hash the password
    bcrypt.hash(values.password, 10, function (err, hash) {
      if (err) return next(err);
      values.password = hash;
      next();
    });

  }

};

