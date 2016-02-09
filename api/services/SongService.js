/**
 * Created by bshen on 09/02/16.
 */


// Function to create a new Song
exports.createSong = function(params, next) {

  // By default, validated is set to false (need validation from Admin)
  delete params.validated;

  Song
    .create(params)
    .exec(function(err, song) {
      if(err) {
        next(err, null);
      }
      next(err, song);
    });


};

// Fetch all songs (if where parameters does not exist, returning all the songs)
exports.getSongs = function(where, next) {

  Song
    .find()
    .where(where)
    .exec(function(err, songs) {
      if(err) {
        console.log('err', err);
      }
      if(!songs) {
        console.log('No songs found in getSongs');
      }
      next(err, songs);
    });

};