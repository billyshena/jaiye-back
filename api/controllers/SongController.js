/**
 * SongController
 *
 * @description :: Server-side logic for managing songs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // Create a new Song
    create: function(req, res) {

      if(!req.param('title') || !req.param('url')) {
        return res.badRequest();
      }

      var params = req.allParams();
      params.owner = req.token.id;

      SongService.createSong(params, function(err, song) {
        if(err) {
          return res.serverError(err);
        }
        return res.json(song);
      });

    },



    // Update a Song and its information
    update: function(req, res) {

      if(!req.param('id')) {
        return res.badRequest();
      }

      var params = req.allParams();
      delete params.id;

      SongService
        .findById( req.param('id'), function(err, song) {
          if(err) {
            return res.serverError(err);
          }
          if(!song){
            return res.notFound();
          }

          if(song.owner !== req.token.id && req.token.type !== sails.config.custom.adminTypeUUID) {
            return res.forbidden();
          }

          SongService.updateSong(song.id, params, function(err, result) {
            if(err) {
              return res.serverError(err);
            }
            if(!song) {
              return res.serverError('No song found in SongController');
            }
            return res.json(result);
          });

        });


    },


    destroy: function(req, res) {

      if(!req.param('id')) {
        return res.badRequest();
      }

      SongService
          .findById( req.param('id'), function(err, song) {
            if(err) {
              return res.serverError(err);
            }
            if(!song) {
              return res.notFound();
            }

            sails.log('here', song);
            console.log('token', req.token.type, 'config', sails.config.custom.adminTypeUUID);
            if((song.owner && song.owner !== req.token.id) || req.token.type !== sails.config.custom.adminTypeUUID) {
              sails.log('forbidden');
              return res.forbidden();
            }

            SongService
                .deleteSong(song.id, function(err) {
                  if(err) {
                    return res.serverError(err);
                  }
                  return res.json(song);
                });
          })



    }


};

