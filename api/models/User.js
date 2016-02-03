/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    facebookID: {
      type: 'string',
      required: true
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

  }
};

