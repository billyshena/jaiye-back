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
        .where(where)
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

exports.updateTag = function(params, next) {

  Tag
      .update(params.id, params)
      .exec(function(err, tag) {
        if(err) {
          console.log('err', err);
        }
        if(!tag || !tag[0]) {
          console.log('No tag found in updateTag');
        }
        next(err, tag);
      });

};


exports.deleteTag = function(id, next) {

  Tag
      .destroy(id)
      .exec(function(err) {
        if(err) {
          console.log('err', err);
        }
        next(err, null);

      });

};