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
