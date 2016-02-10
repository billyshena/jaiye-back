/**
 * Created by bshen on 09/02/16.
 */



exports.createCategory = function(params, next) {

    Category
      .create(params)
      .exec(function(err, category) {
        if(err) {
          console.log('err', err);
        }
        next(err, category);
      });

};


exports.findCategories = function(where, next) {

    Category
        .find()
        .where(where)
        .exec(function(err, categories) {
          if(err) {
            console.log('err', err);
          }
          next(err, categories);
        });

};
