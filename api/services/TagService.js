/**
 * Created by bshen on 09/02/16.
 */


exports.createTag = function(params, next) {

    Tag
        .create(params)
        .exec(function(err, tag) {
          if(err) {
            console.log('err', err);
          }
          next(err, tag);
        });

};



exports.getTags = function(where, next) {

    Tag
        .find()
        .where({
          name: {
            startsWith: where.name
          }
        })
        .exec(function(err, tags) {
          if(err) {
            console.log('err', err);
          }
          if(!tags) {
            console.log('No tags found in getTags');
          }
          next(err, tags);
        });

};