/**
 * Created by bshen on 09/02/16.
 */


// Create a Like for a Song
exports.addLikeToSong = function(params, next) {

    LikeService
      .doesExist({
        artist: params.artist,
        from: params.from,
        song: params.song
      }, function(err, count) {
        if(err) {
          console.log('err', err);
        }
        next(err, count);
      });


};

// Add Like to a Song
exports.addLike = function(params, next) {

    Like
      .create(params)
      .exec(function(err, like) {
        if(err) {
          console.log('err', err);
        }
        next(err, like);
      });

};

// Check whether if the user already liked the song or not
exports.doesExist = function(params, next) {

    Like
      .count(params)
      .exec(function(err, nbLikes) {
        if(err) {
          console.log('err', err);
        }
        next(err, nbLikes);
      });

};


// Destroy a Like
exports.unLike = function(params, next) {

    Like
      .destroy(params)
      .exec(function(err) {
        if(err) {
          console.log('err', err);
        }
        next(err, null);
      });

};
