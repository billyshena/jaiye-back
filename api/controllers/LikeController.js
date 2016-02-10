/**
 * LikeController
 *
 * @description :: Server-side logic for managing likes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    create: function(req, res) {

        if(!req.param('artist') || !req.param('song')) {
          return res.badRequest();
        }

        var params = req.allParams();
        params.from = req.token.id;

        LikeService
          .doesExist(params, function(err, count) {
            if(err) {
              return res.serverError(err);
            }
            console.log('count', count);

            // If Like does not exist, create it
            if(count === 0) {
              LikeService
                .addLike(params, function(err, like) {
                  if(err) {
                    return res.serverError(err);
                  }
                  return res.json(like);
                });
            }

            if(count === 1) {
              LikeService
                .unLike(params, function(err) {
                  if(err) {
                    return res.serverError(err);
                  }
                  return res.json(200);
                });
            }

          });

    }


};

