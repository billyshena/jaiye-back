/**
* Admin.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    email: {
      type: 'email',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },


    type: {
      type: 'string',
      defaultsTo: sails.config.custom.adminTypeUUID
    },


    // Removing the pass when JSONify the user
    toJSON:function(){
      var obj = this.toObject();
      delete obj.password;
      return obj;
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

