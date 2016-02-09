/**
 * SongController
 *
 * @description :: Server-side logic for managing songs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // Create a new Song
    create: function(req, res) {

      var params = req.allParams();

      SongService.createSong(params, function(err, song) {
        if(err) {
          return res.serverError(err);
        }
        return res.json(200);
      });

    },

    // Fetch all songs
    find: function(req, res) {

      var where = req.allParams();

      SongService.getSongs(where, function(err, songs) {
        if(err) {
          return res.serverError(err);
        }
        return res.json(songs);
      });

    },


    // Update a Song and its information
    update: function(req, res) {

      if(!req.param('id')) {
        return res.badRequest();
      }

      Song
        .findOneById( parseInt( req.param('id'), 1 ) )
        .exec(function(err, song) {
          if(err) {
            return res.serverError(err);
          }
          if(!song){
            return res.notFound();
          }
          if(song.owner !== req.token.id || req.token.type !== sails.config.custom.adminTypeUUID) {
            return res.forbidden();
          }
          return res.json(200);
        });


    }


};

