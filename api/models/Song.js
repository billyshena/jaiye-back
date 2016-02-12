/**
* Song.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {


    owner: {
      model: 'user',
      required: true
    },

    title: {
      type: 'string',
      required: true
    },

    url: {
      type: 'string',
      required: true
    },

    description: {
      type: 'text'
    },

    tags: {
      collection: 'tag',
      via: 'songs'
    },

    category: {
      model: 'category'
    },

    validated: {
      type: 'boolean',
      defaultsTo: false
    }


  },


  beforeCreate: function(values, next) {

    if(!values.url) {
      return next();
    }

    // Retrieve Youtube video ID from url
    var url = values.url.split('v=')[1];
    if(url) {
      var pos = url.indexOf('&');
      if (pos !== -1) {
        url = url.substring(0, pos);
      }
      values.url = url;
    }

    return next();

  },


  beforeUpdate: function(values, next) {

    if(!values.url) {
      return next();
    }


    // Retrieve Youtube video ID from url
    var url = values.url.split('v=')[1];
    if(url) {
      var pos = url.indexOf('&');
      if (pos !== -1) {
        url = url.substring(0, pos);
      }
      values.url = url;
    }

    return next();

  }
};

