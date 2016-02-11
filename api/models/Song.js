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


  }
};

