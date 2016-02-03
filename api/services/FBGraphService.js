/**
 * Created by bshen on 03/02/16.
 */

var https = require('https');

module.exports = {


  // Fetch user's info such as Albums, Pictures and Personal information
  fetch: function(accessToken, fields, next) {

    var url = 'https://graph.facebook.com/me?access_token=' + accessToken + '&fields=' + fields;

    this.request(url, function(data) {
      return next(data);
    });

  },


  // Get Album's (id) pictures
  getAlbumPictures: function(accessToken, albumId, next) {

    var url = 'https://graph.facebook.com/' + albumId + '/photos?access_token=' + accessToken + '&fields=source';

    this.request(url, function(data) {
      return next(data);
    });

  },


  request: function(url, next) {

    https.get(url, function (result) {

      var data = '';

      result.on('data', function(d) {
        data += d;
      });

      result.on('end', function() {

        data = JSON.parse(data);
        return next(data);

      });

    }).end();

  }


};
